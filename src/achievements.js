import { QUESTIONS } from './questionData.js';

// 업적 15개입니다. 기준과 이름은 docs/ACHIEVEMENTS.md를 따릅니다.
export const ACHIEVEMENTS = [
  { id: 'first', name: '첫 가지', desc: '처음으로 답했어요', test: s => s.answers >= 1 },
  { id: 'past', name: '여행자', desc: '지난 질문에 처음 답했어요', test: s => s.past >= 1 },
  { id: 'share1', name: '길동무', desc: '처음으로 그룹에 생각을 나눴어요', test: s => s.shares >= 1 },
  { id: 'comment1', name: '말동무', desc: '처음으로 댓글을 남겼어요', test: s => s.comments >= 1 },
  { id: 'group', name: '개척자', desc: '처음으로 그룹을 만들었어요', test: s => s.owner },
  { id: 'streak7', name: '뿌리', desc: '7일 연속으로 답했어요', test: s => s.streak >= 7 },
  { id: 'streak30', name: '수행자', desc: '30일 연속으로 답했어요', test: s => s.streak >= 30 },
  { id: 'streak100', name: '오래된 나무', desc: '100일 연속으로 답했어요', test: s => s.streak >= 100 },
  { id: 'answer10', name: '탐험가', desc: '10번째 답을 남겼어요', test: s => s.answers >= 10 },
  { id: 'answer30', name: '사색가', desc: '30번째 답을 남겼어요', test: s => s.answers >= 30 },
  { id: 'answer100', name: '현자', desc: '100번째 답을 남겼어요', test: s => s.answers >= 100 },
  { id: 'answer200', name: '세계수', desc: '200번째 답을 남겼어요', test: s => s.answers >= 200 },
  { id: 'share10', name: '동반자', desc: '그룹에 10번 생각을 나눴어요', test: s => s.shares >= 10 },
  { id: 'comment100', name: '논객', desc: '댓글을 100개 남겼어요', test: s => s.comments >= 100 },
  { id: 'like100', name: '경청자', desc: '다른 생각에 100번 공감했어요', test: s => s.likes >= 100 },
];

const DAY = 86400000;

// 지금까지 가장 길게 이어진 연속 답변 일수입니다.
function longestStreak(dates) {
  const days = [...new Set(dates)].map(d => Date.parse(d) / DAY).sort((a, b) => a - b);
  let best = 0, run = 0;
  days.forEach((d, i) => { run = i && d - days[i - 1] === 1 ? run + 1 : 1; best = Math.max(best, run); });
  return best;
}

function stats(state) {
  const answered = Object.entries(state.answers).filter(([, a]) => a.submitted);
  return {
    answers: answered.length,
    past: answered.filter(([id, a]) => a.answeredOn !== QUESTIONS.find(q => q.id === id)?.date).length,
    shares: answered.filter(([, a]) => a.sharedWith.length).length,
    comments: state.comments.length,
    likes: state.likes.length,
    owner: state.groups.some(g => g.owner),
    streak: longestStreak(answered.map(([, a]) => a.answeredOn)),
  };
}

// 새로 달성한 업적에 날짜(on)를 남깁니다. 한 번 맺힌 열매는 사라지지 않습니다.
export function recordAchievements(state, date) {
  const s = stats(state);
  const fresh = ACHIEVEMENTS.filter(a => !state.achieved[a.id] && a.test(s));
  if (!fresh.length) return state;
  return { ...state, achieved: { ...state.achieved, ...Object.fromEntries(fresh.map(a => [a.id, { on: date }])) } };
}
