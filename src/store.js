import { STEPS, emptyAnswer, PROFILE_COLORS, updateAnswer, questionStep } from './state.js';
export * from './state.js';
import { DEMO_GROUPS, MEMBERS, QUESTIONS, SAMPLE_COMMENTS } from './questionData.js';
import PARADOXES from '../content/paradoxes.json' with { type: 'json' };
import { ACHIEVEMENTS } from './achievements.js';

export const STORAGE_KEY = 'garae.frontend.v1';
export const initialState = () => ({ started: false, answers: {}, groups: DEMO_GROUPS, joined: ['g1', 'g2'], profile: { name: '', handle: '', bio: '', photo: '', color: 'blue' }, messages: [], comments: [], likes: [], achieved: {} });

const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const text = (value, fallback = '') => typeof value === 'string' ? value : fallback;
const isDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value);
const strings = value => Array.isArray(value) ? [...new Set(value.filter(item => typeof item === 'string'))] : [];

function restoreAnswer(value, id, groups) {
  const answer = isObject(value) ? value : {};
  const sel = QUESTIONS.find(q => q.id === id)?.choices.some(c => c.id === answer.sel) ? answer.sel : null;
  const submitted = answer.submitted === true && sel !== null;
  const completed = answer.completed === true && submitted;
  return {
    sel, reason: text(answer.reason), submitted, completed,
    shareDraft: Array.isArray(answer.shareDraft) ? strings(answer.shareDraft).filter(id => groups.some(g => g.id === id)) : null,
    lastStep: STEPS.includes(answer.lastStep) ? answer.lastStep : null,
    // 답변한 날입니다. 이 값이 생기기 전에 저장된 답변은 질문이 나온 날로 봅니다.
    answeredOn: submitted ? (isDate(answer.answeredOn) ? answer.answeredOn : QUESTIONS.find(q => q.id === id).date) : null,
  };
}

function restoreGroups(value) {
  if (!Array.isArray(value)) return DEMO_GROUPS;
  return value.filter(group => isObject(group) && typeof group.id === 'string' && group.id).map(group => {
    const fallback = DEMO_GROUPS.find(g => g.id === group.id);
    return {
      id: group.id, name: text(group.name, fallback?.name || '이름 없는 그룹'),
      description: text(group.description, fallback?.description), code: text(group.code, fallback?.code),
      color: text(group.color, 'sage'), ...(/^data:image\/jpeg;base64,/.test(group.photo) && { photo: group.photo }), owner: group.owner === true,
      members: Array.isArray(group.members) ? group.members.filter(m => isObject(m) && typeof m.id === 'string').map(m => MEMBERS.find(x => x.id === m.id) || { id: m.id, name: text(m.name, '멤버'), color: text(m.color, 'sage') }) : fallback?.members || [],
    };
  });
}

export function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (isObject(saved)) {
      const groups = restoreGroups(saved.groups);
      const answers = Object.fromEntries(Object.entries(isObject(saved.answers) ? saved.answers : {}).map(([id, answer]) => [id, restoreAnswer(answer, id, groups)]));
      // 공유가 메시지가 되기 전에 저장된 공유 그룹은 공유 메시지로 옮깁니다.
      const oldShares = Object.entries(answers).flatMap(([id, a]) => a.submitted ? strings(saved.answers[id]?.sharedWith).filter(g => groups.some(x => x.id === g)).map(groupId => ({ id: `${id}-${groupId}`, groupId, questionId: id, sel: a.sel, text: a.reason })) : []);
      const comments = (Array.isArray(saved.comments) ? saved.comments : []).filter(c => isObject(c) && typeof c.id === 'string' && typeof c.text === 'string' && c.text && PARADOXES.some(p => p.id === c.topicId));
      return {
        started: saved.started === true,
        // 가입한 날입니다. 이 값이 생기기 전에 저장된 데이터는 가장 오래된 질문 날로 봅니다.
        joinedOn: isDate(saved.joinedOn) ? saved.joinedOn : QUESTIONS.at(-1).date,
        answers,
        groups,
        joined: strings(saved.joined).filter(id => groups.some(g => g.id === id)),
        profile: {
          name: text(saved.profile?.name).slice(0, 10),
          handle: typeof saved.profile?.handle === 'string' && /^[a-z0-9._]{1,20}$/.test(saved.profile.handle) ? saved.profile.handle : '',
          bio: text(saved.profile?.bio).slice(0, 80),
          photo: /^data:image\/jpeg;base64,/.test(saved.profile?.photo) ? saved.profile.photo : '',
          color: PROFILE_COLORS.includes(saved.profile?.color) ? saved.profile.color : 'blue',
        },
        // 공유 메시지(sel이 있는 메시지)는 이유가 비어 있어도 됩니다.
        messages: [...oldShares, ...(Array.isArray(saved.messages) ? saved.messages : []).filter(m => isObject(m) && typeof m.id === 'string' && typeof m.text === 'string' && groups.some(g => g.id === m.groupId) && (m.sel === undefined ? m.text && QUESTIONS.some(q => q.id === m.questionId) : QUESTIONS.find(q => q.id === m.questionId)?.choices.some(c => c.id === m.sel)))],
        comments,
        // 공감은 남아 있는 댓글(샘플 댓글과 내 댓글)에 대한 것만 둡니다.
        likes: strings(saved.likes).filter(id => SAMPLE_COMMENTS.some(c => c.id === id) || comments.some(c => c.id === id)),
        achieved: Object.fromEntries(Object.entries(isObject(saved.achieved) ? saved.achieved : {}).filter(([id, a]) => ACHIEVEMENTS.some(x => x.id === id) && isObject(a) && isDate(a.on))),
      };
    }
  } catch { /* 저장 데이터가 없거나 손상되었으면 데모를 새로 시작합니다. */ }
  return initialState();
}

export function completeAnswer(state, id) {
  if (!state.answers[id]?.submitted || state.answers[id].completed) return state;
  return updateAnswer(state, id, { completed: true });
}

// 처음 답하면 답한 날을 남기고, 다시 답하면 선택과 이유만 바꿉니다. 날짜 같은 나머지 기록은 그대로이고,
// 이미 보낸 공유 메시지도 그대로라서 바뀐 답은 아직 아무 그룹에도 보내지 않은 상태가 됩니다.
export function submitAnswer(state, id, sel, reason, date) {
  const answer = state.answers[id];
  if (!answer?.submitted) return updateAnswer(state, id, { sel, reason, submitted: true, answeredOn: date });
  if (answer.sel === sel && answer.reason === reason) return state;
  return updateAnswer(state, id, { sel, reason, shareDraft: null });
}

// 지금 답을 이미 보낸 그룹입니다. 공유 메시지 가운데 지금 답과 선택·이유가 같은 것을 찾습니다.
export function sentGroups(state, questionId) {
  const answer = state.answers[questionId];
  if (!answer?.submitted) return [];
  return [...new Set(state.messages.filter(m => m.questionId === questionId && m.sel === answer.sel && m.text === answer.reason).map(m => m.groupId))];
}

// 고른 그룹에 지금 답을 공유 메시지로 보냅니다. 이미 보낸 그룹에는 다시 보내지 않습니다.
export function shareAnswer(state, questionId, groupIds) {
  const { sel, reason } = state.answers[questionId];
  const sent = sentGroups(state, questionId);
  const shares = groupIds.filter(g => !sent.includes(g)).map(groupId => ({ id: crypto.randomUUID(), groupId, questionId, sel, text: reason }));
  return updateAnswer({ ...state, messages: [...state.messages, ...shares] }, questionId, { shareDraft: null });
}

export function rememberQuestionRoute(state, route) {
  const [section, id, requestedStep, ...extra] = route.split('/');
  if (!state.started || section !== 'question' || extra.length || !QUESTIONS.some(q => q.id === id) || (requestedStep && !STEPS.includes(requestedStep))) return state;
  const step = questionStep(state.answers[id], requestedStep);
  return state.answers[id]?.lastStep === step ? state : updateAnswer(state, id, { lastStep: step });
}

// 그룹장이 나가면 그룹이 사라집니다.
export function leaveGroup(state, groupId) {
  return {
    ...state,
    groups: state.groups.find(g => g.id === groupId)?.owner ? state.groups.filter(g => g.id !== groupId) : state.groups,
    joined: state.joined.filter(id => id !== groupId),
    messages: state.messages.filter(m => m.groupId !== groupId),
    answers: Object.fromEntries(Object.entries(state.answers).map(([id, answer]) => [id, {
      ...answer,
      shareDraft: answer.shareDraft?.filter(g => g !== groupId) ?? null,
    }])),
  };
}

export function kickMember(state, groupId, memberId) {
  return { ...state, groups: state.groups.map(g => g.id === groupId ? { ...g, members: g.members.filter(m => m.id !== memberId) } : g) };
}

export function addMessage(state, groupId, questionId, value) {
  const text = value.trim();
  if (!text) return state;
  return { ...state, messages: [...state.messages, { id: crypto.randomUUID(), groupId, questionId, text }] };
}

export function addComment(state, topicId, value, parentId) {
  const text = value.trim();
  if (!text) return state;
  return { ...state, comments: [...state.comments, { id: crypto.randomUUID(), topicId, text, ...(parentId && { parentId }) }] };
}

export function toggleLike(state, id) {
  return { ...state, likes: state.likes.includes(id) ? state.likes.filter(l => l !== id) : [...state.likes, id] };
}
