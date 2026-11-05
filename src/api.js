export class ApiError extends Error {
  constructor(message, status = 0, code = 'NETWORK_ERROR') {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function apiBase(value) {
  if (!value) throw new ApiError('서버 주소가 설정되지 않았어요', 0, 'CONFIGURATION_ERROR');
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) throw new Error('Invalid API URL');
  return url.href.replace(/\/$/, '');
}

// A generation prevents requests from restoring a session after logout/account change.
export function createApi({ baseUrl, store, fetchImpl = fetch }) {
  const base = apiBase(baseUrl);
  let session = null, generation = 0, refreshing = null, writes = Promise.resolve();
  const listeners = new Set();
  const ready = store.read().then(value => { if (generation === 0) session = value; return session; });
  const changed = () => listeners.forEach(listener => listener(session));
  async function save(value, expected = generation) {
    if (expected !== generation) throw new ApiError('다시 로그인해 주세요', 401, 'SESSION_CHANGED');
    writes = writes.catch(() => {}).then(async () => {
      if (expected !== generation) throw new ApiError('다시 로그인해 주세요', 401, 'SESSION_CHANGED');
      await store.write(value);
      if (expected !== generation) throw new ApiError('다시 로그인해 주세요', 401, 'SESSION_CHANGED');
      session = value;
      changed();
    });
    await writes;
  }
  async function raw(path, { method = 'GET', body, token } = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    let response;
    try {
      response = await fetchImpl(`${base}${path}`, {
        method, headers: { Accept: 'application/json', ...(body !== undefined && { 'Content-Type': 'application/json' }), ...(token && { Authorization: `Bearer ${token}` }) },
        ...(body !== undefined && { body: JSON.stringify(body) }), signal: controller.signal,
      });
    } catch { throw new ApiError('서버에 연결하지 못했어요. 연결을 확인하고 다시 시도해 주세요'); }
    finally { clearTimeout(timer); }
    const text = await response.text();
    let data;
    try { data = text ? JSON.parse(text) : null; } catch { throw new ApiError('서버 응답을 확인할 수 없어요', response.status, 'INVALID_RESPONSE'); }
    if (!response.ok) throw new ApiError(data?.message || '요청을 처리하지 못했어요', response.status, data?.code);
    return data;
  }
  async function logout() {
    generation++;
    session = null;
    refreshing = null;
    changed();
    writes = writes.catch(() => {}).then(() => store.write(null));
    await writes;
  }
  async function request(path, options = {}) {
    await ready;
    const expected = generation;
    const current = session;
    if (!current) throw new ApiError('다시 로그인해 주세요', 401, 'AUTHENTICATION_ERROR');
    try {
      const data = await raw(path, { ...options, token: current.accessToken });
      if (expected !== generation) throw new ApiError('다시 로그인해 주세요', 401, 'SESSION_CHANGED');
      return data;
    } catch (error) {
      if (expected !== generation || error.status !== 401 || error.code === 'SESSION_CHANGED') throw error;
      if (!refreshing) {
        refreshing = (async () => {
          try {
            const tokens = await raw('/auth/token/refresh', { method: 'POST', body: { refreshToken: current.refreshToken } });
            await save(tokens, expected);
          } catch (failure) {
            if (expected === generation && [400, 401, 404].includes(failure.status)) await logout();
            throw failure;
          } finally { if (expected === generation) refreshing = null; }
        })();
      }
      await refreshing;
      if (expected !== generation || !session) throw new ApiError('다시 로그인해 주세요', 401, 'SESSION_CHANGED');
      return raw(path, { ...options, token: session.accessToken }).then(data => {
        if (expected !== generation) throw new ApiError('다시 로그인해 주세요', 401, 'SESSION_CHANGED');
        return data;
      }).catch(async failure => {
        if (expected === generation && failure.status === 401) await logout();
        throw failure;
      });
    }
  }
  return {
    base, ready, request, logout, get session() { return session; },
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    async login(mode, credentials) {
      await ready;
      const expected = ++generation;
      const tokens = await raw(`/auth/${mode === 'signup' ? 'signup' : 'login'}`, { method: 'POST', body: credentials });
      await save(tokens, expected);
      return tokens;
    },
    photo(path) { return path ? new URL(path, `${base}/`).href : ''; },
  };
}
