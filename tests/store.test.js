import test from 'node:test';
import assert from 'node:assert/strict';
import { initialState, updateAnswer, completeAnswer, questionRoute, rememberQuestionRoute, leaveGroup, loadState, addMessage, addComment, previousStep, STORAGE_KEY } from '../src/store.js';

function restore(saved) {
  globalThis.localStorage = { getItem: () => JSON.stringify(saved) };
  try { return loadState(); } finally { delete globalThis.localStorage; }
}

test('선택 이유 초안은 질문별로 복원되고 완료 후에도 유지된다', () => {
  let state = updateAnswer(initialState(), 'q037', { sel: 1, reason: '친구의 이야기를 먼저 듣고 싶어요.\n회복할 기회도 필요해요.' });
  state = updateAnswer(state, 'q036', { reason: '다른 질문에 대한 생각' });
  state = restore(state);
  assert.equal(state.answers.q037.reason, '친구의 이야기를 먼저 듣고 싶어요.\n회복할 기회도 필요해요.');
  assert.equal(state.answers.q036.reason, '다른 질문에 대한 생각');
  assert.equal(state.answers.q037.submitted, false);
  state = updateAnswer(state, 'q037', { submitted: true });
  state = restore(completeAnswer(state, 'q037'));
  assert.equal(state.answers.q037.reason, '친구의 이야기를 먼저 듣고 싶어요.\n회복할 기회도 필요해요.');
  assert.equal(state.answers.q037.completed, true);
  assert.deepEqual(state.answers.q037.sharedWith, []);
});

test('이유를 작성하지 않은 답변도 제출 상태를 유지한다', () => {
  const state = restore(updateAnswer(initialState(), 'q037', { sel: 0, submitted: true }));
  assert.equal(state.answers.q037.reason, '');
  assert.equal(state.answers.q037.submitted, true);
});

test('기존 답변과 잘못된 이유 필드는 빈 이유로 복구하고 제출 상태를 보존한다', () => {
  for (const reason of [undefined, null, 42, {}, []]) {
    const state = restore({ ...initialState(), answers: { q037: { sel: 0, submitted: true, reason } } });
    assert.equal(state.answers.q037.reason, '');
    assert.equal(state.answers.q037.submitted, true);
  }
});

test('제출한 답변만 완료되고 이전 버전의 완료 상태는 보존한다', () => {
  const state = updateAnswer(initialState(), 'q037', { sel: 0 });
  assert.equal(completeAnswer(state, 'q037'), state);
  assert.equal(completeAnswer(state, 'q036'), state);
  const restored = restore({ ...initialState(), answers: { q035: { sel: 0, submitted: true, completed: true, shift: 0, note: '이전 성찰' } } });
  assert.equal(restored.answers.q035.completed, true);
  assert.equal(Object.hasOwn(restored.answers.q035, 'note'), false);
});

test('탭 이동과 새로고침 후 질문별 마지막 단계를 이어 보고 완료한 질문은 기록으로 간다', () => {
  let state = { ...initialState(), started: true };
  assert.equal(questionRoute('q037', state.answers.q037), 'question/q037/answer');
  state = updateAnswer(state, 'q037', { sel: 0, submitted: true });
  state = rememberQuestionRoute(state, 'question/q037/reading');
  state = updateAnswer(state, 'q036', { sel: 1, submitted: true });
  state = rememberQuestionRoute(state, 'question/q036/result');
  state = rememberQuestionRoute(state, 'today');
  state = restore(state);
  assert.equal(questionRoute('q037', state.answers.q037), 'question/q037/reading');
  assert.equal(questionRoute('q036', state.answers.q036), 'question/q036/result');
  state = rememberQuestionRoute(state, 'question/q037/result');
  assert.equal(questionRoute('q037', state.answers.q037), 'question/q037/result');
  state = completeAnswer(state, 'q037');
  assert.equal(questionRoute('q037', state.answers.q037), 'records/q037');
  assert.equal(rememberQuestionRoute(state, 'question/q036/reflect'), state);
});

test('잘못된 경로와 온보딩은 진행 단계를 기록하지 않고 직접 접근의 잠금도 유지한다', () => {
  const initial = initialState();
  assert.equal(rememberQuestionRoute(initial, 'question/q037/reading'), initial);
  let state = { ...initial, started: true };
  for (const route of ['question/unknown/reading', 'question/q037/wrong', 'question/q037/reading/extra']) {
    assert.equal(rememberQuestionRoute(state, route), state);
  }
  state = rememberQuestionRoute(state, 'question/q037/reading');
  assert.equal(state.answers.q037.lastStep, 'answer');
  state = updateAnswer(state, 'q037', { sel: 0, submitted: true });
  state = rememberQuestionRoute(state, 'question/q037/done');
  assert.equal(state.answers.q037.lastStep, 'reading');
  assert.equal(questionRoute('q036', { submitted: true }), 'question/q036/result');
});

test('필드가 손상된 답변은 정상 문장을 보존하고 잘못된 필드만 복구한다', () => {
  const state = restore({ ...initialState(), started: 'yes', answers: {
    q037: { sel: 0, submitted: true, reason: '보존할 문장', sharedWith: null, rx: {}, completed: 'yes', shareDraft: 'g1', lastStep: 'invalid' },
    q036: { sel: 99, submitted: true, reason: null, completed: true, sharedWith: [null, 'g1', 1], rx: ['이해됐어요', null] },
    q035: null,
  } });
  assert.equal(state.started, false);
  assert.equal(state.answers.q037.reason, '보존할 문장');
  assert.deepEqual(state.answers.q037.sharedWith, []);
  assert.equal(state.answers.q037.completed, false);
  assert.equal(state.answers.q037.shareDraft, null);
  assert.equal(state.answers.q037.lastStep, null);
  assert.equal(state.answers.q036.sel, null);
  assert.equal(state.answers.q036.submitted, false);
  assert.equal(state.answers.q036.completed, false);
  assert.equal(state.answers.q036.reason, '');
  assert.deepEqual(state.answers.q036.sharedWith, []);
  assert.equal(state.answers.q035.reason, '');
  assert.doesNotThrow(() => leaveGroup(state, 'g1'));
});

test('그룹과 멤버의 손상은 다른 정상 답변을 잃지 않고 복구한다', () => {
  const saved = { ...initialState(), answers: { q037: { reason: '보존할 문장' } }, groups: [
    null, { id: 'custom', name: null, description: 5, code: null, members: [null, { id: 'm', name: 3 }] },
    { ...initialState().groups[0], members: null },
  ], joined: [null, 'g1', 'custom', 'missing'] };
  const state = restore(saved);
  assert.equal(state.answers.q037.reason, '보존할 문장');
  assert.deepEqual(state.joined, ['g1', 'custom']);
  assert.equal(typeof state.groups[0].name, 'string');
  assert.equal(typeof state.groups[0].members[0].name, 'string');
  assert.ok(Array.isArray(state.groups[1].members));
  assert.equal(restore({ ...saved, groups: null }).answers.q037.reason, '보존할 문장');
});

test('질문별 초안과 제출 상태가 서로 섞이지 않는다', () => {
  const initial = initialState();
  let state = updateAnswer(initial, 'q037', { sel: 1, submitted: true, reason: '오늘의 생각' });
  state = updateAnswer(state, 'q036', { sel: 0 });
  assert.equal(state.answers.q037.reason, '오늘의 생각');
  assert.equal(state.answers.q037.sel, 1);
  assert.equal(state.answers.q036.sel, 0);
  assert.equal(state.answers.q036.submitted, false);
  assert.deepEqual(state.answers.q037.sharedWith, []);
  assert.deepEqual(initial.answers, {});
});

test('그룹을 나가면 그 그룹의 공유만 해제하고 선택과 이유는 유지한다', () => {
  let state = { ...initialState(), joined: ['g1', 'g2'] };
  state = updateAnswer(state, 'q037', { sel: 0, submitted: true, completed: true, reason: '나의 생각', sharedWith: ['g1', 'g2'] });
  state = updateAnswer(state, 'q036', { sel: 2, submitted: true, sharedWith: ['g1'] });
  const result = leaveGroup(state, 'g1');
  assert.deepEqual(result.joined, ['g2']);
  assert.deepEqual(result.answers.q037.sharedWith, ['g2']);
  assert.deepEqual(result.answers.q036.sharedWith, []);
  assert.equal(result.answers.q037.reason, '나의 생각');
  assert.equal(result.answers.q037.completed, true);
  assert.equal(result.answers.q036.sel, 2);
  assert.deepEqual(state.answers.q037.sharedWith, ['g1', 'g2']);
});

test('공유 대상 초안은 저장 전까지 공개 대상에 반영되지 않으며 질문별로 복원된다', () => {
  let state = updateAnswer(initialState(), 'q037', { sel: 1, submitted: true, sharedWith: ['g1'] });
  state = updateAnswer(state, 'q037', { shareDraft: ['g2'] });
  state = updateAnswer(state, 'q036', { shareDraft: [] });
  assert.deepEqual(state.answers.q037.sharedWith, ['g1']);
  globalThis.localStorage = { getItem: () => JSON.stringify(state) };
  try {
    const restored = loadState();
    assert.deepEqual(restored.answers.q037.shareDraft, ['g2']);
    assert.deepEqual(restored.answers.q036.shareDraft, []);
    const saved = updateAnswer(restored, 'q037', { sharedWith: restored.answers.q037.shareDraft, shareDraft: null });
    assert.deepEqual(saved.answers.q037.sharedWith, ['g2']);
    assert.equal(saved.answers.q037.shareDraft, null);
  } finally { delete globalThis.localStorage; }
});

test('탈퇴한 그룹은 공유 대상 초안에서도 제거된다', () => {
  const state = updateAnswer(initialState(), 'q037', { sharedWith: ['g1'], shareDraft: ['g1', 'g2'] });
  const result = leaveGroup(state, 'g1');
  assert.deepEqual(result.answers.q037.sharedWith, []);
  assert.deepEqual(result.answers.q037.shareDraft, ['g2']);
  assert.deepEqual(state.answers.q037.shareDraft, ['g1', 'g2']);
});

test('어제 저장한 답변을 유지하면서 새 공유 초안 필드만 보완한다', () => {
  const saved = { ...initialState(), started: true, answers: { q037: { sel: 1, submitted: true, reason: '어제 남긴 생각', sharedWith: ['g1'] } } };
  globalThis.localStorage = { getItem: () => JSON.stringify(saved) };
  try {
    const restored = loadState();
    assert.equal(restored.answers.q037.reason, '어제 남긴 생각');
    assert.deepEqual(restored.answers.q037.sharedWith, ['g1']);
    assert.equal(restored.answers.q037.shareDraft, null);
  } finally { delete globalThis.localStorage; }
});

test('저장된 답변과 그룹을 복원하고 손상된 저장 데이터는 초기화한다', () => {
  const saved = updateAnswer({ ...initialState(), started: true }, 'q036', { sel: 1, submitted: true, sharedWith: ['g1'] });
  globalThis.localStorage = { getItem: key => key === STORAGE_KEY ? JSON.stringify(saved) : null };
  assert.deepEqual(loadState(), saved);
  globalThis.localStorage = { getItem: () => '{broken' };
  assert.deepEqual(loadState(), initialState());
  globalThis.localStorage = { getItem: () => { throw new Error('storage blocked'); } };
  assert.deepEqual(loadState(), initialState());
  delete globalThis.localStorage;
});

test('프로필은 저장·복원되고 잘못된 값은 기본값으로 돌아간다', () => {
  assert.deepEqual(restore({ ...initialState(), profile: { name: '도원', color: 'peach' } }).profile, { name: '도원', color: 'peach' });
  assert.deepEqual(restore({ ...initialState(), profile: { name: 3, color: 'red' } }).profile, initialState().profile);
  assert.deepEqual(restore({ ...initialState(), profile: undefined }).profile, initialState().profile);
});

test('그룹 메시지는 질문별로 저장·복원되고 그룹을 나가면 사라진다', () => {
  let state = addMessage(initialState(), 'g1', 'q037', '  다음 모임에서 더 이야기해요  ');
  state = addMessage(state, 'g1', 'q037', '   ');
  state = restore({ ...state, messages: [...state.messages, { id: 'x', groupId: 'g1', questionId: 'q037', text: 3 }, { id: 'y', groupId: 'nope', questionId: 'q037', text: '없는 그룹' }] });
  assert.equal(state.messages.length, 1);
  assert.equal(state.messages[0].text, '다음 모임에서 더 이야기해요');
  assert.equal(state.messages[0].questionId, 'q037');
  assert.deepEqual(leaveGroup(state, 'g1').messages, []);
  assert.deepEqual(restore({ ...initialState(), messages: undefined }).messages, []);
});

test('진행 단계에서 뒤로가면 이전 단계로, 나의 선택에서는 들어온 화면으로 돌아간다', () => {
  assert.equal(previousStep('reading'), 'result');
  assert.equal(previousStep('result'), 'answer');
  for (const step of ['answer', 'done', 'share', 'reflect']) assert.equal(previousStep(step), null);
});

test('생각 댓글은 주제별로 저장·복원되고 빈 댓글과 잘못된 주제는 버린다', () => {
  let state = addComment(initialState(), 'p001', '  같은 배일까요?  ');
  assert.equal(addComment(state, 'p001', '   '), state);
  state = restore({ ...state, comments: [...state.comments, { id: 'x', topicId: 'p001', text: 3 }, { id: 'y', topicId: 'nope', text: '없는 주제' }, null] });
  assert.equal(state.comments.length, 1);
  assert.equal(state.comments[0].text, '같은 배일까요?');
  assert.equal(state.comments[0].topicId, 'p001');
  assert.deepEqual(restore({ ...initialState(), comments: undefined }).comments, []);
});
