import assert from 'node:assert/strict';
import { test } from 'node:test';
import { apiBase, createApi } from '../src/api.js';
import { blankState, mergeDrafts, draftKey, userFromApi, answerFromApi } from '../src/serverState.js';

const tokens = { userId: 1, accessToken: 'old', refreshToken: 'refresh' };
const response = (data, status = 200) => new Response(JSON.stringify(data), { status });
function memoryStore(initial = tokens) {
  let saved = initial;
  return { read: async () => saved, write: async value => { saved = value; }, get value() { return saved; } };
}

test('only HTTP API URLs are accepted; credentials are never embedded in URLs', () => {
  assert.equal(apiBase('https://api.example.org/api/v1/'), 'https://api.example.org/api/v1');
  for (const value of ['', 'javascript:alert(1)', 'https://user:password@example.org', 'https://example.org?token=x']) assert.throws(() => apiBase(value));
});

test('login sends the password only in JSON and persists the returned tokens', async () => {
  const store = memoryStore(null);
  const api = createApi({ baseUrl: 'https://api.example.org/api/v1', store, fetchImpl: async (url, options) => {
    assert.equal(url, 'https://api.example.org/api/v1/auth/login');
    assert.equal(options.headers.Authorization, undefined);
    assert.deepEqual(JSON.parse(options.body), { handle: 'user', password: 'private-password' });
    return response(tokens);
  } });
  await api.login('signin', { handle: 'user', password: 'private-password' });
  assert.deepEqual(store.value, tokens);
});

test('concurrent expired requests share one refresh and retry with the new token', async () => {
  let refreshCount = 0;
  const api = createApi({ baseUrl: 'https://api.example.org/api/v1', store: memoryStore(), fetchImpl: async (url, options) => {
    if (url.endsWith('/auth/token/refresh')) {
      refreshCount++;
      await new Promise(resolve => setTimeout(resolve, 5));
      return response({ ...tokens, accessToken: 'new' });
    }
    return options.headers.Authorization === 'Bearer old' ? response({ code: 'AUTHENTICATION_ERROR' }, 401) : response({ ok: true });
  } });
  assert.deepEqual(await Promise.all([api.request('/users/me'), api.request('/groups')]), [{ ok: true }, { ok: true }]);
  assert.equal(refreshCount, 1);
});

test('expired refresh clears credentials while a temporary network failure preserves them', async () => {
  const store = memoryStore();
  const api = createApi({ baseUrl: 'https://api.example.org/api/v1', store, fetchImpl: async url => response({ code: 'INVALID_TOKEN' }, 401) });
  await assert.rejects(api.request('/users/me'));
  assert.equal(api.session, null);
  assert.equal(store.value, null);
  const offlineStore = memoryStore();
  const offline = createApi({ baseUrl: 'https://api.example.org/api/v1', store: offlineStore, fetchImpl: async () => { throw new Error('offline'); } });
  await assert.rejects(offline.request('/users/me'), /서버에 연결/);
  assert.deepEqual(offlineStore.value, tokens);
});

test('a refresh finishing after logout cannot sign the user back in', async () => {
  let finishRefresh;
  const store = memoryStore();
  const api = createApi({ baseUrl: 'https://api.example.org/api/v1', store, fetchImpl: async url => {
    if (url.endsWith('/auth/token/refresh')) return new Promise(resolve => { finishRefresh = () => resolve(response({ ...tokens, accessToken: 'late' })); });
    return response({}, 401);
  } });
  const pending = api.request('/users/me');
  while (!finishRefresh) await new Promise(resolve => setImmediate(resolve));
  await api.logout(); finishRefresh();
  await assert.rejects(pending);
  assert.equal(api.session, null);
  assert.equal(store.value, null);
});

test('authorization failures do not refresh tokens and preserve the server error', async () => {
  let calls = 0;
  const api = createApi({ baseUrl: 'https://api.example.org/api/v1', store: memoryStore(), fetchImpl: async () => { calls++; return response({ code: 'ANSWER_REQUIRED', message: 'Answer first' }, 403); } });
  await assert.rejects(api.request('/questions/q1/result'), error => error.code === 'ANSWER_REQUIRED' && error.status === 403);
  assert.equal(calls, 1);
});

test('requests work on WebViews without AbortSignal.timeout', async () => {
  const timeout = AbortSignal.timeout;
  AbortSignal.timeout = undefined;
  try {
    const api = createApi({ baseUrl: 'https://api.example.org/api/v1', store: memoryStore(), fetchImpl: async (_, options) => {
      assert(options.signal instanceof AbortSignal);
      return response({ ok: true });
    } });
    assert.deepEqual(await api.request('/users/me'), { ok: true });
  } finally { AbortSignal.timeout = timeout; }
});

test('drafts are isolated by server and account, cannot overwrite server answers, and validate choices', () => {
  assert.notEqual(draftKey('https://one.example', 1), draftKey('https://two.example', 1));
  assert.notEqual(draftKey('https://one.example', 1), draftKey('https://one.example', 2));
  const state = { ...blankState(), questions: [{ id: 'new-server-question', choices: [{ id: 0 }] }, { id: 'saved', choices: [{ id: 1 }] }], answers: { saved: answerFromApi({ choiceId: 1, reason: 'Server', completed: true }) } };
  const merged = mergeDrafts(state, { 'new-server-question': { sel: 99, reason: 'x'.repeat(600) }, saved: { sel: 0, reason: 'Old draft' }, missing: { sel: 0 } });
  assert.equal(merged.answers['new-server-question'].sel, null);
  assert.equal(merged.answers['new-server-question'].reason.length, 500);
  assert.equal(merged.answers.saved.reason, 'Server');
  assert.equal(merged.answers.missing, undefined);
  assert.equal(blankState().groups.length, 0);
});

test('profile photos resolve relative to the API host and achievements use server dates', () => {
  const api = createApi({ baseUrl: 'https://api.example.org/api/v1', store: memoryStore() });
  const user = userFromApi(api, { id: 2, photoUrl: '/api/v1/users/2/photo?v=1', achievements: [{ id: 'first', achievedOn: '2026-11-05' }], stats: { answerCount: 1 } });
  assert.equal(user.photo, 'https://api.example.org/api/v1/users/2/photo?v=1');
  assert.deepEqual(user.achieved, { first: { on: '2026-11-05' } });
});

test('withdrawal sends authenticated DELETE with a password and accepts an empty 204 response', async () => {
  const store = memoryStore();
  const api = createApi({ baseUrl: 'https://api.example.org/api/v1', store, fetchImpl: async (url, options) => {
    assert.equal(url, 'https://api.example.org/api/v1/users/me');
    assert.equal(options.method, 'DELETE');
    assert.deepEqual(JSON.parse(options.body), { password: 'confirmation-password' });
    assert.equal(options.headers.Authorization, 'Bearer old');
    return new Response(null, { status: 204 });
  } });
  assert.equal(await api.request('/users/me', { method: 'DELETE', body: { password: 'confirmation-password' } }), null);
  await api.logout();
  assert.equal(store.value, null);
});
