import { DEMO_GROUPS, QUESTIONS } from './questionData.js';
import PARADOXES from '../content/paradoxes.json' with { type: 'json' };

export const STORAGE_KEY = 'garae.frontend.v1';
export const STEPS = ['answer', 'result', 'reading', 'done', 'share'];
export const emptyAnswer = () => ({ sel: null, reason: '', submitted: false, completed: false, sharedWith: [], shareDraft: null, lastStep: null });
export const PROFILE_COLORS = ['sage', 'blue', 'peach', 'lilac'];
export const initialState = () => ({ started: false, answers: {}, groups: DEMO_GROUPS, joined: ['g1'], profile: { name: '', color: 'blue' }, messages: [], comments: [] });

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
      members: Array.isArray(group.members) ? group.members.filter(m => isObject(m) && typeof m.id === 'string').map(m => ({ id: m.id, name: text(m.name, '멤버'), color: text(m.color, 'sage') })) : fallback?.members || [],
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
        answers: Object.fromEntries(Object.entries(isObject(saved.answers) ? saved.answers : {}).map(([id, answer]) => [id, restoreAnswer(answer, id, groups)])),
        groups,
        joined: strings(saved.joined).filter(id => groups.some(g => g.id === id)),
        profile: {
          name: text(saved.profile?.name).slice(0, 10),
          color: PROFILE_COLORS.includes(saved.profile?.color) ? saved.profile.color : 'blue',
        },
        messages: (Array.isArray(saved.messages) ? saved.messages : []).filter(m => isObject(m) && typeof m.id === 'string' && typeof m.text === 'string' && m.text && groups.some(g => g.id === m.groupId) && QUESTIONS.some(q => q.id === m.questionId)),
        comments: (Array.isArray(saved.comments) ? saved.comments : []).filter(c => isObject(c) && typeof c.id === 'string' && typeof c.text === 'string' && c.text && PARADOXES.some(p => p.id === c.topicId)),
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
  if (requestedStep === 'done' && !answer.completed) return 'reading';
  return STEPS.includes(requestedStep) ? requestedStep : 'result';
}

// 진행 단계의 뒤로가기 대상입니다. 나의 선택·완료·나누기는 질문에 들어오기 전 화면으로 돌아갑니다.
const PREVIOUS = { result: 'answer', reading: 'result' };
export const previousStep = step => PREVIOUS[step] ?? null;

export function questionRoute(id, answer) {
  return answer?.completed ? `records/${id}` : `question/${id}/${questionStep(answer, answer?.lastStep)}`;
}

export function rememberQuestionRoute(state, route) {
  const [section, id, requestedStep, ...extra] = route.split('/');
  if (!state.started || section !== 'question' || extra.length || !QUESTIONS.some(q => q.id === id) || (requestedStep && !STEPS.includes(requestedStep))) return state;
  const step = questionStep(state.answers[id], requestedStep);
  return state.answers[id]?.lastStep === step ? state : updateAnswer(state, id, { lastStep: step });
}

export function leaveGroup(state, groupId) {
  return {
    ...state,
    joined: state.joined.filter(id => id !== groupId),
    messages: state.messages.filter(m => m.groupId !== groupId),
    answers: Object.fromEntries(Object.entries(state.answers).map(([id, answer]) => [id, {
      ...answer,
      sharedWith: answer.sharedWith.filter(g => g !== groupId),
      shareDraft: answer.shareDraft?.filter(g => g !== groupId) ?? null,
    }])),
  };
}

export function addMessage(state, groupId, questionId, value) {
  const text = value.trim();
  if (!text) return state;
  return { ...state, messages: [...state.messages, { id: crypto.randomUUID(), groupId, questionId, text }] };
}

export function addComment(state, topicId, value) {
  const text = value.trim();
  if (!text) return state;
  return { ...state, comments: [...state.comments, { id: crypto.randomUUID(), topicId, text }] };
}
