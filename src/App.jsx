import { useEffect, useRef, useState } from 'react';
import Login from './screens/Login.jsx';
import Onboard from './screens/Onboard.jsx';
import Account from './screens/Account.jsx';
import Notifications from './screens/Notifications.jsx';
import Today, { STREAK_KEY } from './screens/Today.jsx';
import Archive from './screens/Archive.jsx';
import Feed, { TopicPage } from './screens/Feed.jsx';
import Question from './screens/Question.jsx';
import Result from './screens/Result.jsx';
import Comments from './screens/Comments.jsx';
import Reading from './screens/Reading.jsx';
import Done from './screens/Done.jsx';
import Summary from './screens/Summary.jsx';
import Share from './screens/Share.jsx';
import Records, { MyComments, MemberProfile } from './screens/Records.jsx';
import { Settings, NotifySettings, ProfileForm, Sources, LegalDoc, WithdrawForm, Safety, ReportForm, BlockedUsers } from './screens/Settings.jsx';
import { Groups, GroupForm, GroupDetail, GroupMembers, GroupsAddMenu } from './screens/Groups.jsx';
import { BottomNav, Header, Icon } from './components/UI.jsx';
import { dateLabel } from './questionData.js';
import { useServer } from './useServer.js';
import { defaultNotify, STEPS, emptyAnswer, updateAnswer, questionStep, questionRoute, questionBack, joinedGroups } from './store.js';

const routeFromLocation = () => location.hash.replace(/^#\/?/, '') || 'today';
// 진행 선 세 칸: 선택 / 결과·다른 생각 / 확장하기
const PROGRESS = { answer: 0, result: 1, reading: 2 };
const LEGAL_TITLES = { terms: '이용약관', privacy: '개인정보처리방침', contact: '문의' };
const NOTIFY_KEY = 'galae.notify.v1';

export default function App() {
  const [route, setRoute] = useState(routeFromLocation);
  const server = useServer(route);
  const { state, setState, run, mutate } = server;
  const QUESTIONS = state.questions;
  const TODAY = state.today;
  const TOPICS = state.topics;
  const [welcome, setWelcome] = useState('login');
  // 알림 설정은 서버에 저장하지 않고 기기에만 둡니다.
  const [notify, setNotify] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem(NOTIFY_KEY)); return { ...defaultNotify(), ...(saved && typeof saved === 'object' ? saved : {}) }; }
    catch { return defaultNotify(); }
  });
  // 질문 흐름에 들어오기 직전 화면. 나의 선택에서 뒤로가면 이곳으로 돌아갑니다.
  const [origin, setOrigin] = useState(null);
  // 다시 하기로 새로 답하는 중인 답입니다. 선택하기를 누르기 전까지 저장된 답은 그대로이고, 확장하기를 마치면 끝납니다.
  const [redo, setRedo] = useState(null);
  // 공유 시트를 연 화면의 경로입니다. 다른 화면으로 가면 시트는 닫힙니다.
  const [sharing, setSharing] = useState(null);
  const mainRef = useRef(null);
  // 바로 전 화면. 설정에서 프로필 편집 뒤 돌아갈 곳을 정할 때 씁니다.
  const prevRoute = useRef(null);
  useEffect(() => {
    const onHashChange = () => setRoute(routeFromLocation());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  useEffect(() => {
    if (mainRef.current) { mainRef.current.scrollTop = 0; mainRef.current.querySelector('h1')?.focus({ preventScroll: true }); }
  }, [route, state.started]);
  useEffect(() => {
    try { localStorage.setItem(NOTIFY_KEY, JSON.stringify(notify)); } catch { /* 저장할 수 없는 환경입니다. */ }
  }, [notify]);
  // 다시 답하던 질문을 벗어나면 다시 하기를 그만둡니다. 프로필을 보고 돌아오는 동안은 이어 갑니다.
  useEffect(() => {
    const [section, id] = route.split('/');
    if (!(section === 'question' && id === redo?.id) && section !== 'users') setRedo(null);
  }, [route]);
  function go(next) {
    // Ignore navigation from a save handler belonging to a screen already left.
    if (routeFromLocation() !== route) return;
    if (next === route) return;
    // 다른 사람 프로필에서 질문으로 돌아갈 때는 처음 들어온 화면을 그대로 둡니다.
    if (next.startsWith('question/') && !route.startsWith('question/') && !route.startsWith('users/')) setOrigin(route);
    prevRoute.current = route;
    location.hash = `/${next}`; setRoute(next);
  }
  // 다른 사람 프로필에서 뒤로 가면 돌아갈 화면입니다. 댓글 시트에서 왔으면 시트를 연 채로 돌아갑니다.
  const profileFrom = useRef(null);
  function openProfile(memberId, from = route) { profileFrom.current = from; go(`users/${memberId}`); }
  function welcomeGo(next) {
    if (['signup', 'signin', 'onboard'].includes(next)) setWelcome(next);
    else { setWelcome('login'); go('today'); }
  }
  function openQuestion(id) { go(questionRoute(id, state.answers[id])); }
  function patch(id, value) {
    if ('shareDraft' in value) {
      const previous = state.answers[id].shareDraft;
      setState(s => updateAnswer(s, id, value));
      return run(() => server.api.request(`/questions/${id}/answer/progress`, { method: 'PATCH', body: { shareDraft: value.shareDraft.map(Number) } })).then(saved => {
        if (!saved) setState(s => updateAnswer(s, id, { shareDraft: previous }));
        return saved;
      });
    }
    setState(s => updateAnswer(s, id, value));
  }
  // 그룹에서 들어온 질문이면 그 그룹을 미리 체크한 채 공유 시트를 엽니다. 저장해야 공유됩니다.
  function openShare(id, groupId) {
    if (groupId) patch(id, { shareDraft: [groupId, ...(state.answers[id].shareDraft ?? []).filter(g => g !== groupId)] });
    setSharing(route);
  }
  function photoFields(fields, original) {
    const { photo, ...rest } = fields;
    return photo === original ? rest : { ...rest, photo };
  }
  const createGroup = fields => run(async () => {
    const group = await mutate('/groups', 'POST', fields);
    go(`groups/${group.id}/members`);
  });

  const [section, id, requestedStep, extra] = route.split('/');
  let active = section;
  let content;
  if (!state.started || welcome === 'onboard') content = welcome === 'login' ? <Login go={welcomeGo} />
    : welcome === 'signup' ? <Account mode="signup" back={() => setWelcome('login')} onDone={credentials => run(async () => { await server.authenticate('signup', credentials); setWelcome('onboard'); })} />
    : welcome === 'signin' ? <Account mode="signin" back={() => setWelcome('login')} onDone={credentials => run(async () => { await server.authenticate('signin', credentials); welcomeGo('today'); })} />
    : <Onboard go={welcomeGo} />;
  else if (section === 'today' && !id) content = <Today state={state} go={go} openQuestion={openQuestion} />;
  else if (section === 'notifications' && !id) { active = 'today'; content = <><Header back={() => go('today')} title="알림" /><Notifications state={state} go={go} topics={TOPICS} /></>; }
  else if (section === 'archive' && !id) content = <Archive questions={QUESTIONS} answers={state.answers} openQuestion={openQuestion} />;
  else if (section === 'feed' && !requestedStep && (!id || TOPICS.some(t => t.id === id))) content = <Feed topics={TOPICS} key={id} initialTopic={id} comments={state.comments} onOpen={topicId => go(`feed/${topicId}/read`)} />;
  else if (section === 'feed' && (requestedStep === 'read' || requestedStep === 'comments') && !extra && TOPICS.some(t => t.id === id)) content = <TopicPage topic={TOPICS.find(t => t.id === id)} initialComments={requestedStep === 'comments'} back={() => go(`feed/${id}`)} comments={state.comments} likes={state.likes} profile={state.profile} onComment={(topicId, text, parentId) => run(() => mutate(`/feed/topics/${topicId}/comments`, 'POST', { text, parentId: parentId ? Number(parentId) : null }))} onLike={commentId => run(() => mutate(`/comments/${commentId}/like`, state.likes.includes(commentId) ? 'DELETE' : 'PUT'))} onProfile={openProfile} />;
  else if (section === 'question' && (!extra || requestedStep === 'result') && (!requestedStep || STEPS.includes(requestedStep))) {
    const question = QUESTIONS.find(q => q.id === id);
    const from = origin?.split('/')[0];
    active = ['today', 'archive', 'groups', 'records'].includes(from) ? from : id === TODAY?.id ? 'today' : 'archive';
    const home = origin || active;
    const fromGroup = from === 'groups' ? state.groups.find(g => g.id === origin.split('/')[1] && state.joined.includes(g.id)) : null;
    // 결과 화면에서 고른 선택지의 코멘트 목록입니다. 경로: question/:id/result/:choiceId
    const choice = extra === undefined ? null : question?.choices.find(c => String(c.id) === extra);
    if (question && (extra === undefined || choice)) {
      const saved = state.answers[id] || emptyAnswer();
      const redoing = redo?.id === id;
      const answer = redoing ? { ...saved, ...redo.answer } : saved;
      const edit = fields => redoing ? setRedo(r => ({ ...r, answer: { ...r.answer, ...fields } })) : patch(id, fields);
      const step = questionStep(answer, requestedStep);
      const sent = state.shares[id] || [];
      const flowGo = next => STEPS.includes(next) ? go(`question/${id}/${next}`) : go(next);
      const next = () => flowGo(STEPS[STEPS.indexOf(step) + 1]);
      const openChoice = choiceId => go(`question/${id}/result/${choiceId}`);
      const share = () => openShare(id, fromGroup?.id);
      let flow;
      switch (step) {
        case 'answer': flow = <Question question={question} answer={answer} onPick={sel => { if (!answer.submitted) edit({ sel }); }} onReason={reason => { if (!answer.submitted) edit({ reason }); }} onSubmit={() => run(async () => { if (answer.sel === null) return; await mutate(`/questions/${id}/answer`, 'PUT', { choiceId: answer.sel, reason: answer.reason }); if (redoing) edit({ submitted: true }); flowGo('result'); })} />; break;
        case 'result': flow = choice ? <Comments question={question} choice={choice} comments={question.opinions[choice.id]?.opinions || []} page={question.opinions[choice.id]} onMore={() => run(async () => { const page = question.opinions[choice.id]; const data = await server.api.request(`/questions/${id}/choices/${choice.id}/opinions?page=${page.page + 1}`); setState(s => ({ ...s, questions: s.questions.map(q => q.id === id ? { ...q, opinions: { ...q.opinions, [choice.id]: { ...data, opinions: [...page.opinions, ...data.opinions] } } } : q) })); })} answer={answer} profile={state.profile} onProfile={openProfile} /> : <Result question={question} sel={answer.sel} onOpen={openChoice} next={next} />; break;
        case 'reading': flow = <Reading question={question} next={() => run(async () => { if (answer.completed) return flowGo('summary'); await mutate(`/questions/${id}/answer/complete`, 'POST'); setRedo(null); next(); })} />; break;
        case 'done': flow = <Done question={question} answer={answer} sent={sent} go={flowGo} onShare={share} />; break;
        case 'summary': flow = <Summary question={question} answer={answer} groups={state.groups} sent={sent} onOpen={openChoice} onShare={share} onHome={() => flowGo('today')} onReading={() => flowGo('reading')} onRetry={() => { setRedo({ id, answer: { sel: null, reason: '', submitted: false, completed: false } }); flowGo('answer'); }} />; break;
      }
      if ((step === 'done' || step === 'summary') && sharing === route) flow = <>{flow}<Share answer={answer} groups={joinedGroups(state)} sent={sent} onDraft={shareDraft => patch(id, { shareDraft })} onSave={groupIds => run(() => mutate(`/questions/${id}/share`, 'POST', { groupIds: groupIds.map(Number) }))} onClose={() => setSharing(null)} go={go} /></>;
      const back = () => go(questionBack({ id, step, completed: answer.completed, choice: !!choice, home }));
      const position = PROGRESS[step];
      content = <><Header back={back} title={`${question.date === state.todayDate ? '오늘의 갈래' : id === TODAY?.id ? '최근 갈래' : '지난 갈래'} · ${dateLabel(question.date)}`} />{position !== undefined && <ol className="progress">{['나의 선택', '다른 생각', '확장하기'].map((label, i) => <li key={label} className={i <= position ? 'on' : ''} aria-current={i === position ? 'step' : undefined}><span />{label}</li>)}</ol>}{flow}</>;
    }
  } else if (section === 'groups' && (!extra || (requestedStep === 'members' && QUESTIONS.some(q => q.id === extra)))) {
    if (!id) content = <Groups state={state} go={go} />;
    else if ((id === 'new' || id === 'join') && !requestedStep) content = <GroupForm key={id} mode={id} state={state} go={go} onCreate={createGroup} onJoin={code => run(async () => { const group = await mutate('/groups/join', 'POST', { code }); go(`groups/${group.id}`); })} />;
    else {
      const group = state.groups.find(g => g.id === id && state.joined.includes(id));
      if (group && requestedStep === 'settings' && group.owner && !extra) content = <GroupForm key={`${id}/settings`} mode="edit" group={group} go={go} onSave={fields => run(async () => { await mutate(`/groups/${id}`, 'PATCH', photoFields(fields, group.photo)); go(`groups/${id}/members`); })} />;
      else if (group && (!requestedStep || requestedStep === 'members' || QUESTIONS.some(q => q.id === requestedStep))) content = requestedStep === 'members' ? <GroupMembers key={id} group={group} profile={state.profile} questionId={extra} go={go} onKick={memberId => run(() => mutate(`/groups/${id}/members/${memberId}`, 'DELETE'))} onLeave={groupId => run(async () => { await mutate(`/groups/${groupId}/members/me`, 'DELETE'); go('groups'); })} onProfile={openProfile} /> : <GroupDetail key={`${id}/${requestedStep || ''}`} initialQuestionId={requestedStep} group={group} state={state} go={go} openQuestion={openQuestion} onSend={(questionId, text) => run(() => mutate(`/groups/${id}/questions/${questionId}/messages`, 'POST', { text }))} onProfile={openProfile} />;
    }
  } else if (section === 'records' && !requestedStep) {
    if (!id) content = <Records questions={QUESTIONS} todayDate={state.todayDate} answers={state.answers} achieved={state.achieved} comments={state.myComments} profile={state.profile} joinedOn={state.joinedOn} go={go} openQuestion={openQuestion} />;
    else if (id === 'comments') content = <><Header back={() => go('records')} title="댓글" /><MyComments comments={state.myComments} go={go} /></>;
  } else if (section === 'users' && !requestedStep) {
    const member = state.members[id];
    const from = profileFrom.current?.split('/')[0];
    active = from === 'question' ? origin?.split('/')[0] : from;
    if (member) content = <><Header back={() => go(profileFrom.current || 'today')} title={member.handle} /><MemberProfile member={member} blocked={state.blocks.some(block => block.id === id)} onBlock={() => run(() => mutate(`/users/me/blocks/${id}`, 'PUT'))} onUnblock={() => run(() => mutate(`/users/me/blocks/${id}`, 'DELETE'))} /></>;
  } else if (section === 'settings' && !requestedStep) {
    active = 'records';
    if (!id) content = <><Header back={() => go('records')} title="설정" /><Settings profile={state.profile} go={go} onLogout={() => run(async () => { await server.logout(); go('today'); setWelcome('login'); })} /></>;
    else if (id === 'profile') {
      // 나 탭의 프로필 줄에서 들어왔으면 나 탭으로, 설정에서 들어왔으면 설정으로 돌아갑니다.
      const profileBack = prevRoute.current === 'records' ? 'records' : 'settings';
      content = <><Header back={() => go(profileBack)} title="프로필" /><ProfileForm profile={state.profile} onSave={profile => run(async () => { await mutate('/users/me', 'PATCH', photoFields(profile, state.profile.photo)); go(profileBack); })} /></>;
    }
    else if (id === 'notify') content = <><Header back={() => go('settings')} title="알림" /><NotifySettings notify={notify} onChange={setNotify} /></>;
    else if (id === 'sources') content = <><Header back={() => go('settings')} title="출처" /><Sources topics={TOPICS} /></>;
    else if (id === 'safety') content = <><Header back={() => go('settings')} title="신고 및 차단" /><Safety go={go} /></>;
    else if (id === 'report') content = <><Header back={() => go('settings/safety')} title="신고하기" /><ReportForm profile={state.profile} go={go} /></>;
    else if (id === 'blocks') content = <><Header back={() => go('settings/safety')} title="차단한 사용자" /><BlockedUsers blocks={state.blocks} onUnblock={userId => run(() => mutate(`/users/me/blocks/${userId}`, 'DELETE'))} /></>;
    else if (id in LEGAL_TITLES) content = <><Header back={() => go('settings')} title={LEGAL_TITLES[id]} /><LegalDoc doc={id} /></>;
    else if (id === 'withdraw') content = <><Header back={() => go('settings')} title="탈퇴" /><WithdrawForm onWithdraw={password => run(async () => {
      await server.api.request('/users/me', { method: 'DELETE', body: { password } });
      await server.logout();
      try { localStorage.removeItem(`${STREAK_KEY}:${state.profile.id}`); } catch { /* 저장할 수 없는 환경입니다. */ }
      setWelcome('login'); go('today');
    })} /></>;
    else if (id === 'onboard') content = <Onboard go={() => go('settings')} />;
  }
  const tabRoot = state.started && welcome !== 'onboard' && (!id || (section === 'feed' && !requestedStep && content)) && ['today', 'archive', 'feed', 'groups', 'records'].includes(section);
  const TAB_TITLES = { feed: '생각', archive: '질문', groups: '그룹', records: '내 정보' };
  const tabHeader = <header className="tab-header">{section === 'today' ? <img src="/logo.png" alt="갈래" /> : <span className="tab-title" aria-hidden="true">{TAB_TITLES[section]}</span>}{section === 'today' && <button className="icon-button" aria-label="알림" onClick={() => go('notifications')}><Icon name="bell" size={22} /></button>}{section === 'records' && <button className="icon-button" aria-label="설정" onClick={() => go('settings')}><Icon name="gear" size={22} /></button>}{section === 'groups' && <GroupsAddMenu go={go} />}</header>;
  if (!content) content = <div className="flow"><h1 className="flow-title" tabIndex={-1}>찾을 수 없어요</h1><button className="btn-primary" onClick={() => go('today')}>오늘로</button></div>;

  if (server.booting) content = <p className="empty" role="status">불러오는 중…</p>;
  else if (state.started && welcome !== 'onboard' && !server.ready) content = <div className="empty">{!server.error && <p role="status">불러오는 중…</p>}<button className="btn-text" onClick={server.retry}>다시 불러오기</button></div>;
  return <div className="frame" aria-busy={server.busy}>
    <main ref={mainRef} className={`screen ${state.started && route !== 'settings/onboard' ? 'app-screen' : ''} ${section === 'feed' && !requestedStep && state.started ? 'flush' : ''}`} id="main-content" key={state.started ? route : welcome}>
      {server.error && <div><p className="form-error" role="alert">{server.error}</p>{server.api?.session && <button className="btn-text" onClick={server.retry}>다시 불러오기</button>}</div>}{tabRoot && tabHeader}<fieldset className="app-content" disabled={server.busy}>{content}</fieldset>
    </main>{state.started && welcome !== 'onboard' && route !== 'settings/onboard' && <BottomNav active={active} go={go} />}
  </div>;
}
