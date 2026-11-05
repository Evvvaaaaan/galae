import { useEffect, useRef, useState } from 'react';
import { createApi } from './api.js';
import { sessionStore } from './session.js';
import { blankState, loadSnapshot, loadDrafts, mergeDrafts, draftKey, userFromApi, groupFromApi, answerFromApi } from './serverState.js';
import { STEPS, questionStep } from './store.js';

const configuredUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV || import.meta.env.MODE === 'development' ? 'http://127.0.0.1:8080/api/v1' : '');

export function useServer(route) {
  const [connection] = useState(() => {
    try { return { api: createApi({ baseUrl: configuredUrl, store: sessionStore(configuredUrl) }) }; }
    catch (error) { return { error }; }
  });
  const { api } = connection;
  const [state, setState] = useState(blankState);
  const [booting, setBooting] = useState(true);
  const [error, setError] = useState(connection.error?.message || '');
  const [busy, setBusy] = useState(false);
  const [revision, setRevision] = useState(0);
  const [resourceRoute, setResourceRoute] = useState(null);
  const account = useRef(0);
  const mutation = useRef(false);

  async function refresh() {
    const expected = account.current;
    const snapshot = await loadSnapshot(api);
    if (expected !== account.current) return;
    setState(previous => mergeDrafts({
      ...snapshot, messages: previous.messages, comments: previous.comments, likes: previous.likes, members: previous.members, shares: previous.shares,
      questions: snapshot.questions.map(q => {
        const old = previous.questions.find(x => x.id === q.id);
        return { ...q, reading: old?.reading || null, opinions: old?.opinions || {} };
      }),
    }, { ...loadDrafts(api.base, snapshot.profile.id), ...Object.fromEntries(Object.entries(previous.answers).filter(([, a]) => !a.submitted)) }));
    setRevision(value => value + 1);
  }
  useEffect(() => {
    if (!api) { setBooting(false); return; }
    let alive = true;
    const unsubscribe = api.subscribe(session => {
      if (!session) { account.current++; setState(blankState()); setResourceRoute(null); }
    });
    api.ready.then(async session => { if (alive && session) await refresh(); }).catch(failure => { if (alive) setError(failure.message); }).finally(() => { if (alive) setBooting(false); });
    return () => { alive = false; unsubscribe(); };
  }, [api]);

  // Only unsubmitted drafts are local, isolated by API and user. Server records are never cached here.
  useEffect(() => {
    if (!state.started) return;
    try {
      localStorage.setItem(draftKey(api.base, state.profile.id), JSON.stringify(Object.fromEntries(Object.entries(state.answers).filter(([, a]) => !a.submitted))));
    } catch { setError('초안을 기기에 저장하지 못했어요'); }
  }, [state.answers, state.started]);

  useEffect(() => {
    if (!state.started) return;
    let alive = true, polling = false;
    const [section, id, step, extra] = route.split('/');
    const question = state.questions.find(q => q.id === id);
    const group = state.groups.find(g => g.id === id);
    const questionId = state.questions.some(q => q.id === step) ? step : state.today?.id;
    async function load() {
      if (polling) return;
      polling = true;
      try {
        if (section === 'question' && question && state.answers[id]?.submitted) {
          const [result, reading, share, opinions] = await Promise.all([
            api.request(`/questions/${id}/result`), api.request(`/questions/${id}/reading`), api.request(`/questions/${id}/share`),
            extra !== undefined ? api.request(`/questions/${id}/choices/${extra}/opinions`) : null,
          ]);
          if (!alive) return;
          setState(s => ({ ...s, questions: s.questions.map(q => q.id === id ? { ...q, participants: result.participantCount, choices: result.choices.map(c => ({ ...c, short: c.shortText })), reading, opinions: opinions ? { [extra]: opinions } : q.opinions } : q), shares: { ...s.shares, [id]: share.sentGroupIds.map(String) } }));
          const lastStep = questionStep(state.answers[id], step);
          if (STEPS.includes(lastStep) && state.answers[id].lastStep !== lastStep) {
            const answer = await api.request(`/questions/${id}/answer/progress`, { method: 'PATCH', body: { lastStep } });
            if (!alive) return;
            setState(s => ({ ...s, answers: { ...s.answers, [id]: answerFromApi(answer) } }));
          }
        } else if (section === 'groups' && group) {
          const [detail, messages] = await Promise.all([
            api.request(`/groups/${id}`),
            step === 'members' || step === 'settings' || !questionId ? null : api.request(`/groups/${id}/questions/${questionId}/messages`),
          ]);
          if (!alive) return;
          setState(s => ({ ...s, groups: s.groups.map(g => g.id === id ? { ...g, ...groupFromApi(api, detail, Number(s.profile.id)) } : g), ...(messages && { messages: messages.messages.map(m => ({ ...m, id: String(m.id), groupId: id, questionId, author: userFromApi(api, m.author), sel: m.share && m.choiceId !== null ? m.choiceId : undefined, locked: messages.locked && !m.mine })) }) }));
        } else if (section === 'feed') {
          let topics = state.topics;
          if (id && !topics.some(t => t.id === id)) {
            const topic = await api.request(`/feed/topics/${id}`);
            if (topic.checkedOn) topics = [...topics, { ...topic, cards: topic.cards.map(text => ({ text })) }];
          }
          const comments = (await Promise.all(topics.map(t => api.request(`/feed/topics/${t.id}/comments`)))).flatMap(list => list.flatMap(c => [c, ...c.replies]));
          if (!alive) return;
          setState(s => ({ ...s, topics, comments: comments.map(c => ({ ...c, id: String(c.id), parentId: c.parentId ? String(c.parentId) : null, member: userFromApi(api, c.author), memberId: String(c.author.id), likes: c.likeCount })), likes: comments.filter(c => c.liked).map(c => String(c.id)) }));
        } else if (section === 'users' && id) {
          const member = userFromApi(api, await api.request(`/users/${id}`));
          if (!alive) return;
          setState(s => ({ ...s, members: { ...s.members, [id]: member } }));
        }
        if (alive) setResourceRoute(route);
      } catch (failure) {
        if (alive) { setResourceRoute(null); setError(failure.message); }
      } finally { polling = false; }
    }
    setResourceRoute(current => current === route ? current : null);
    load();
    const timer = section === 'groups' && group && !['members', 'settings'].includes(step) ? setInterval(load, 5000) : null;
    return () => { alive = false; if (timer) clearInterval(timer); };
  }, [route, revision, state.started]);

  async function run(work) {
    if (mutation.current) return false;
    mutation.current = true;
    setBusy(true); setError('');
    try { await work(); return true; }
    catch (failure) { setError(failure.message); return false; }
    finally { mutation.current = false; setBusy(false); }
  }
  async function authenticate(mode, credentials) {
    if (!api) throw connection.error;
    account.current++;
    setState(blankState());
    await api.login(mode, credentials);
    await refresh();
  }
  async function logout() {
    const key = draftKey(api.base, state.profile.id);
    await api.logout();
    try { localStorage.removeItem(key); } catch { /* Memory and credentials have already been cleared. */ }
  }
  async function mutate(path, method, body) {
    const result = await api.request(path, { method, body });
    try { await refresh(); }
    catch { setError('저장했지만 화면을 갱신하지 못했어요. 다시 불러와 주세요'); }
    return result;
  }
  return { state, setState, api, booting, busy, error, ready: resourceRoute === route, run, authenticate, logout, mutate, retry: () => run(refresh) };
}
