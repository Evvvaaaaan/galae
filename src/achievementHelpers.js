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

export const DAY = 86400000;
export const addDays = (iso, n) => new Date(Date.parse(iso) + n * DAY).toISOString().slice(0, 10);

// 맺은 업적을 맺은 순서대로, 맺은 날(on)과 함께 돌려줍니다.
export const earnedList = achieved => Object.entries(achieved).map(([id, a]) => ({ ...ACHIEVEMENTS.find(x => x.id === id), on: a.on }));

// 답한 날짜 목록입니다.
export const answeredDays = answers => new Set(Object.values(answers).filter(a => a.submitted && a.answeredOn).map(a => a.answeredOn));

// 오늘(아직 안 했으면 어제)부터 거슬러 올라가며 이어서 답한 날을 셉니다.
export function currentStreak(answers, today) {
  const answered = answeredDays(answers);
  let streak = 0;
  for (let d = answered.has(today) ? today : addDays(today, -1); answered.has(d); d = addDays(d, -1)) streak++;
  return streak;
}

