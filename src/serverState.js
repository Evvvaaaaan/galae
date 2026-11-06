import { emptyAnswer } from './state.js';

export const blankState = () => ({ started: false, questions: [], today: null, todayDate: '', topics: [], answers: {}, groups: [], joined: [], profile: {}, achieved: {}, messages: [], comments: [], myComments: [], likes: [], members: {}, shares: {}, blocks: [] });
export const answerFromApi = answer => answer ? { ...emptyAnswer(), sel: answer.choiceId, reason: answer.reason || '', submitted: true, completed: answer.completed, answeredOn: answer.answeredOn, lastStep: answer.lastStep, shareDraft: answer.shareDraft?.map(String) ?? null } : emptyAnswer();
export const achievementsFromApi = list => Object.fromEntries(list.map(a => [a.id, { on: a.achievedOn }]));

export function userFromApi(api, user) {
  return { ...user, id: String(user.id), photo: api.photo(user.photoUrl), answers: user.stats?.answerCount || 0, streak: user.stats?.currentStreak || 0, comments: user.stats?.commentCount || 0, achieved: achievementsFromApi(user.achievements || []) };
}

export function questionFromApi(question) {
  return { ...question, participants: question.participantCount, choices: question.choices.map(c => ({ ...c, short: c.shortText })), opinions: {}, reading: null };
}

export function topicFromApi(api, topic) {
  return { ...topic, thumbnail: api.photo(topic.imageUrl), cards: topic.cards.map(text => ({ text })) };
}

export function groupFromApi(api, group, userId) {
  return { ...group, id: String(group.id), code: group.inviteCode, photo: api.photo(group.photoUrl), members: group.members.filter(m => m.user.id !== userId).map(m => ({ ...userFromApi(api, m.user), owner: m.owner })) };
}

export async function loadSnapshot(api) {
  const [profile, list, groups, feed, myComments, blocks] = await Promise.all([
    api.request('/users/me'), api.request('/questions'), api.request('/groups'), api.request('/feed'), api.request('/users/me/comments'),
    // 차단 목록은 뒤에 붙은 기능이라, 아직 배포되지 않은 서버에서도 나머지 화면은 열리게 합니다.
    api.request('/users/me/blocks').catch(error => { if (error.status === 404) return []; throw error; }),
  ]);
  // Detail carries choices and the full saved answer, unlike the archive summary.
  const [details, groupDetails] = await Promise.all([
    Promise.all(list.map(q => api.request(`/questions/${q.id}`))),
    Promise.all(groups.map(g => api.request(`/groups/${g.id}`))),
  ]);
  const questions = details.map(questionFromApi);
  const today = questions[0] || null;
  return {
    ...blankState(), started: true, questions, today, todayDate: feed.date,
    topics: feed.topics.filter(t => t.checkedOn).map(t => topicFromApi(api, t)),
    answers: Object.fromEntries(details.filter(q => q.myAnswer).map(q => [q.id, answerFromApi(q.myAnswer)])),
    profile: userFromApi(api, profile), joinedOn: profile.joinedOn, achieved: achievementsFromApi(profile.achievements),
    groups: groupDetails.map(g => ({ ...groupFromApi(api, g, profile.id), todaySharedMembers: groups.find(x => x.id === g.id).todaySharedMembers.map(m => userFromApi(api, m)) })),
    joined: groups.map(g => String(g.id)), myComments,
    blocks: blocks.map(block => ({ ...userFromApi(api, block.user), blockedAt: block.blockedAt })),
  };
}

export const draftKey = (base, userId) => `galae.drafts.v1:${base}:${userId}`;
export function loadDrafts(base, userId) {
  try { return JSON.parse(localStorage.getItem(draftKey(base, userId))) || {}; } catch { return {}; }
}

export function mergeDrafts(state, drafts) {
  const answers = { ...state.answers };
  for (const q of state.questions) {
    const draft = drafts[q.id];
    if (draft && !answers[q.id]?.submitted) answers[q.id] = { ...emptyAnswer(), sel: q.choices.some(c => c.id === draft.sel) ? draft.sel : null, reason: typeof draft.reason === 'string' ? draft.reason.slice(0, 500) : '' };
  }
  return { ...state, answers };
}
