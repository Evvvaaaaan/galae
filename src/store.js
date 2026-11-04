import { DEMO_GROUPS, MEMBERS, QUESTIONS } from './questionData.js';
import PARADOXES from '../content/paradoxes.json' with { type: 'json' };
import { ACHIEVEMENTS } from './achievements.js';

export const STORAGE_KEY = 'garae.frontend.v1';
export const STEPS = ['answer', 'result', 'reading', 'done', 'share', 'summary'];
export const emptyAnswer = () => ({ sel: null, reason: '', submitted: false, completed: false, sharedWith: [], shareDraft: null, lastStep: null });
export const PROFILE_COLORS = ['sage', 'blue', 'peach', 'lilac'];
export const THEMES = ['light', 'dark', 'auto'];
export const initialState = () => ({ started: false, answers: {}, groups: DEMO_GROUPS, joined: ['g1', 'g2'], profile: { name: '', handle: '', bio: '', photo: '', color: 'blue' }, theme: 'auto', messages: [], comments: [], likes: [], achieved: {} });

const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const text = (value, fallback = '') => typeof value === 'string' ? value : fallback;
const strings = value => Array.isArray(value) ? [...new Set(value.filter(item => typeof item === 'string'))] : [];

function restoreAnswer(value, id, groups) {
  const answer = isObject(value) ? value : {};
  const sel = QUESTIONS.find(q => q.id === id)?.choices.some(c => c.id === answer.sel) ? answer.sel : null;
  const submitted = answer.submitted === true && sel !== null;
  const completed = answer.completed === true && submitted;
  const sharedWith = submitted ? strings(answer.sharedWith).filter(id => groups.some(g => g.id === id)) : [];
  return {
    sel, reason: text(answer.reason), submitted, completed, sharedWith,
    shareDraft: Array.isArray(answer.shareDraft) ? strings(answer.shareDraft).filter(id => groups.some(g => g.id === id)) : null,
    lastStep: STEPS.includes(answer.lastStep) ? answer.lastStep : null,
    // 답변한 날입니다. 이 값이 생기기 전에 저장된 답변은 질문이 나온 날로 봅니다.
    answeredOn: submitted ? (/^\d{4}-\d{2}-\d{2}$/.test(answer.answeredOn) ? answer.answeredOn : QUESTIONS.find(q => q.id === id).date) : null,
  };
}

function restoreGroups(value) {
  if (!Array.isArray(value)) return DEMO_GROUPS;
  return value.filter(group => isObject(group) && typeof group.id === 'string' && group.id).map(group => {
    const fallback = DEMO_GROUPS.find(g => g.id === group.id);
    return {
      id: group.id, name: text(group.name, fallback?.name || '이름 없는 그룹'),
      description: text(group.description, fallback?.description), code: text(group.code, fallback?.code),
      color: text(group.color, 'sage'), owner: group.owner === true,
      members: Array.isArray(group.members) ? group.members.filter(m => isObject(m) && typeof m.id === 'string').map(m => MEMBERS.find(x => x.id === m.id) || { id: m.id, name: text(m.name, '멤버'), color: text(m.color, 'sage') }) : fallback?.members || [],
    };
  });
}

export function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (isObject(saved)) {
      const groups = restoreGroups(saved.groups);
      return {
        started: saved.started === true,
        // 가입한 날입니다. 이 값이 생기기 전에 저장된 데이터는 가장 오래된 질문 날로 봅니다.
        joinedOn: /^\d{4}-\d{2}-\d{2}$/.test(saved.joinedOn) ? saved.joinedOn : QUESTIONS.at(-1).date,
        answers: Object.fromEntries(Object.entries(isObject(saved.answers) ? saved.answers : {}).map(([id, answer]) => [id, restoreAnswer(answer, id, groups)])),
        groups,
        joined: strings(saved.joined).filter(id => groups.some(g => g.id === id)),
        profile: {
          name: text(saved.profile?.name).slice(0, 10),
          handle: typeof saved.profile?.handle === 'string' && /^[a-z0-9._]{1,20}$/.test(saved.profile.handle) ? saved.profile.handle : '',
          bio: text(saved.profile?.bio).slice(0, 80),
          photo: /^data:image\/jpeg;base64,/.test(saved.profile?.photo) ? saved.profile.photo : '',
          color: PROFILE_COLORS.includes(saved.profile?.color) ? saved.profile.color : 'blue',
        },
        theme: THEMES.includes(saved.theme) ? saved.theme : 'auto',
        messages: (Array.isArray(saved.messages) ? saved.messages : []).filter(m => isObject(m) && typeof m.id === 'string' && typeof m.text === 'string' && m.text && groups.some(g => g.id === m.groupId) && QUESTIONS.some(q => q.id === m.questionId)),
        comments: (Array.isArray(saved.comments) ? saved.comments : []).filter(c => isObject(c) && typeof c.id === 'string' && typeof c.text === 'string' && c.text && PARADOXES.some(p => p.id === c.topicId)),
        likes: (Array.isArray(saved.likes) ? saved.likes : []).filter(id => typeof id === 'string'),
        achieved: Object.fromEntries(Object.entries(isObject(saved.achieved) ? saved.achieved : {}).filter(([id, a]) => ACHIEVEMENTS.some(x => x.id === id) && isObject(a) && /^\d{4}-\d{2}-\d{2}$/.test(a.on))),
      };
    }
  } catch { /* 저장 데이터가 없거나 손상되었으면 데모를 새로 시작합니다. */ }
  return initialState();
}

export function updateAnswer(state, id, patch) {
  return { ...state, answers: { ...state.answers, [id]: { ...emptyAnswer(), ...state.answers[id], ...patch } } };
}

export function completeAnswer(state, id) {
  if (!state.answers[id]?.submitted || state.answers[id].completed) return state;
  return updateAnswer(state, id, { completed: true });
}

export function questionStep(answer, requestedStep) {
  if (!answer?.submitted) return 'answer';
  if ((requestedStep === 'done' || requestedStep === 'summary') && !answer.completed) return 'reading';
  return STEPS.includes(requestedStep) ? requestedStep : 'result';
}

// 진행 단계의 뒤로가기 대상입니다. 나의 선택·완료·나누기는 질문에 들어오기 전 화면으로 돌아갑니다.
const PREVIOUS = { result: 'answer', reading: 'result' };
export const previousStep = step => PREVIOUS[step] ?? null;

export function questionRoute(id, answer) {
  return answer?.completed ? `question/${id}/summary` : `question/${id}/${questionStep(answer, answer?.lastStep)}`;
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
      sharedWith: answer.sharedWith.filter(g => g !== groupId),
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
