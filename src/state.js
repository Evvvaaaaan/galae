export const STEPS = ['answer', 'result', 'reading', 'done', 'summary'];
export const emptyAnswer = () => ({ sel: null, reason: '', submitted: false, completed: false, shareDraft: null, lastStep: null });
export const COLOR_LABELS = { sage: '초록', blue: '파랑', peach: '살구', lilac: '보라' };
export const PROFILE_COLORS = Object.keys(COLOR_LABELS);
// 아이디는 영문 소문자, 숫자, 마침표, 밑줄만 씁니다.
export const cleanHandle = value => value.toLowerCase().replace(/[^a-z0-9._]/g, '');
export const joinedGroups = state => state.groups.filter(g => state.joined.includes(g.id));
// 이름이 없으면 '나'로 보여 줍니다.
export const myself = profile => ({ name: profile.name || '나', handle: profile.handle || profile.name || '나', color: profile.color, photo: profile.photo });

export function updateAnswer(state, id, patch) {
  return { ...state, answers: { ...state.answers, [id]: { ...emptyAnswer(), ...state.answers[id], ...patch } } };
}

export function questionStep(answer, requestedStep) {
  if (!answer?.submitted) return 'answer';
  if ((requestedStep === 'done' || requestedStep === 'summary') && !answer.completed) return 'reading';
  return STEPS.includes(requestedStep) ? requestedStep : 'result';
}

// 진행 단계의 뒤로가기 대상입니다. 나의 선택·완료는 질문에 들어오기 전 화면으로 돌아갑니다.
const PREVIOUS = { result: 'answer', reading: 'result' };
export const previousStep = step => PREVIOUS[step] ?? null;

// 질문 흐름에서 뒤로가면 갈 경로입니다. choice는 선택지별 코멘트를 보는 중인지, home은 질문에 들어오기 전 화면입니다.
export function questionBack({ id, step, completed, choice, home }) {
  if (completed && ((choice && step === 'result') || step === 'reading')) return `question/${id}/summary`;
  if (choice && step === 'result') return `question/${id}/result`;
  if (previousStep(step)) return `question/${id}/${previousStep(step)}`;
  return home;
}

export function questionRoute(id, answer) {
  return answer?.completed ? `question/${id}/summary` : `question/${id}/${questionStep(answer, answer?.lastStep)}`;
}

