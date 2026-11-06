import { DEMO_GROUPS, QUESTIONS } from './questionData.js';

import { ACHIEVEMENTS, DAY } from './achievementHelpers.js';
export * from './achievementHelpers.js';

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
    shares: new Set(state.messages.filter(m => m.sel !== undefined).map(m => m.questionId)).size,
    comments: state.comments.length,
    likes: state.likes.length,
    // 처음부터 그룹장인 데모 그룹은 내가 만든 그룹이 아닙니다.
    owner: state.groups.some(g => g.owner && !DEMO_GROUPS.some(d => d.id === g.id)),
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
