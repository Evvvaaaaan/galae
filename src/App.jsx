import { useEffect, useRef, useState } from 'react';
import Login from './screens/Login.jsx';
import Onboard from './screens/Onboard.jsx';
import Account from './screens/Account.jsx';
import Today from './screens/Today.jsx';
import Archive from './screens/Archive.jsx';
import Feed, { TOPICS } from './screens/Feed.jsx';
import Question from './screens/Question.jsx';
import Result from './screens/Result.jsx';
import Comments from './screens/Comments.jsx';
import Reading from './screens/Reading.jsx';
import Done from './screens/Done.jsx';
import Share from './screens/Share.jsx';
import Records, { MyComments } from './screens/Records.jsx';
import RecordDetail from './screens/RecordDetail.jsx';
import { Settings, ProfileForm, Sources } from './screens/Settings.jsx';
import { Groups, GroupForm, GroupDetail, GroupMembers, GroupsAddMenu } from './screens/Groups.jsx';
import { BottomNav, Header, Icon } from './components/UI.jsx';
import { QUESTIONS, TODAY, dateLabel } from './questionData.js';
import { recordAchievements } from './achievements.js';
import { STORAGE_KEY, STEPS, loadState, emptyAnswer, updateAnswer, completeAnswer, questionStep, questionRoute, rememberQuestionRoute, previousStep, leaveGroup, addMessage, addComment, toggleLike } from './store.js';

const routeFromLocation = () => location.hash.replace(/^#\/?/, '') || 'today';
// 진행 선 세 칸: 선택 / 결과·다른 생각 / 확장하기
const PROGRESS = { answer: 0, result: 1, reading: 2 };

export default function App() {
  const [state, setState] = useState(loadState);
  const [route, setRoute] = useState(routeFromLocation);
  const [welcome, setWelcome] = useState('login');
  const [storageError, setStorageError] = useState(false);
  // 질문 흐름에 들어오기 직전 화면. 나의 선택에서 뒤로가면 이곳으로 돌아갑니다.
  const [origin, setOrigin] = useState(null);
  // 기록 상세에 들어오기 직전 화면. 질문 흐름에서 돌아온 경우에는 바꾸지 않습니다.
  const [recordFrom, setRecordFrom] = useState('records');
  const mainRef = useRef(null);
  // 바로 전 화면. 완료 → 나누기에서 뒤로가면 완료로 돌아가기 위해 씁니다.
  const prevRoute = useRef(null);
  useEffect(() => {
    const onHashChange = () => setRoute(routeFromLocation());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  // 상태가 바뀔 때마다 새로 달성한 업적을 남깁니다.
  useEffect(() => { setState(s => recordAchievements(s, TODAY.date)); }, [state]);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); setStorageError(false); }
    catch { setStorageError(true); }
  }, [state]);
  useEffect(() => {
    if (mainRef.current) { mainRef.current.scrollTop = 0; mainRef.current.querySelector('h1')?.focus({ preventScroll: true }); }
    setState(s => rememberQuestionRoute(s, route));
  }, [route, state.started]);
  function go(next) {
    if (next === route) return;
    if (next.startsWith('question/') && !route.startsWith('question/')) setOrigin(route);
    if (/^records\/[^/]+$/.test(next) && !route.startsWith('question/')) setRecordFrom(route);
    prevRoute.current = route;
    location.hash = `/${next}`; setRoute(next);
  }
  function welcomeGo(next) { if (['signup', 'signin', 'onboard'].includes(next)) setWelcome(next); else setState(s => ({ ...s, started: true, joinedOn: s.joinedOn || TODAY.date })); }
  function openQuestion(id) { go(questionRoute(id, state.answers[id])); }
  function patch(id, value) { setState(s => updateAnswer(s, id, value)); }
  // 그룹에서 나누기를 누르면 그 그룹을 미리 체크한 채 공유 화면을 엽니다. 저장해야 공유됩니다.
  function shareToGroup(id, groupId) {
    const answer = state.answers[id];
    patch(id, { shareDraft: [groupId, ...(answer.shareDraft ?? answer.sharedWith).filter(g => g !== groupId)] });
    go(`question/${id}/share`);
  }
  function createGroup(fields) {
    const id = crypto.randomUUID();
    let code;
    do { code = crypto.randomUUID().replaceAll('-', '').slice(0, 6).toUpperCase(); } while (state.groups.some(g => g.code === code));
    setState(s => ({ ...s, groups: [...s.groups, { ...fields, id, code, owner: true, members: [] }], joined: [...s.joined, id] }));
    go(`groups/${id}/members`);
  }

  const [section, id, requestedStep, extra] = route.split('/');
  let active = section;
  let content;
  if (!state.started) content = welcome === 'login' ? <Login go={welcomeGo} />
    : welcome === 'signup' ? <Account mode="signup" back={() => setWelcome('login')} onDone={({ handle, name }) => { setState(s => ({ ...s, profile: { ...s.profile, handle, name } })); setWelcome('onboard'); }} />
    : welcome === 'signin' ? <Account mode="signin" back={() => setWelcome('login')} onDone={() => welcomeGo('today')} />
    : <Onboard go={welcomeGo} />;
  else if (section === 'today' && !id) content = <Today state={state} go={go} openQuestion={openQuestion} />;
  else if (section === 'archive' && !id) content = <Archive answers={state.answers} openQuestion={openQuestion} />;
  else if (section === 'feed' && (!id || TOPICS.some(t => t.id === id))) content = <Feed key={id} initialTopic={id} comments={state.comments} likes={state.likes} profile={state.profile} onComment={(topicId, text, parentId) => setState(s => addComment(s, topicId, text, parentId))} onLike={id => setState(s => toggleLike(s, id))} />;
  else if (section === 'question' && (!extra || requestedStep === 'result') && (!requestedStep || STEPS.includes(requestedStep))) {
    const question = QUESTIONS.find(q => q.id === id);
    const from = origin?.split('/')[0];
    active = ['today', 'archive', 'groups', 'records'].includes(from) ? from : id === TODAY.id ? 'today' : 'archive';
    const home = origin || active;
    const fromGroup = from === 'groups' ? state.groups.find(g => g.id === origin.split('/')[1] && state.joined.includes(g.id)) : null;
    // 결과 화면에서 고른 선택지의 코멘트 목록입니다. 경로: question/:id/result/:choiceId
    const choice = extra === undefined ? null : question?.choices.find(c => String(c.id) === extra);
    if (question && (extra === undefined || choice)) {
      const answer = state.answers[id] || emptyAnswer();
      const step = questionStep(answer, requestedStep);
      const flowGo = next => STEPS.includes(next) ? go(`question/${id}/${next}`) : go(next);
      const next = () => flowGo(STEPS[STEPS.indexOf(step) + 1]);
      let flow;
      switch (step) {
        case 'answer': flow = <Question question={question} answer={answer} onPick={sel => { if (!answer.submitted) patch(id, { sel }); }} onReason={reason => { if (!answer.submitted) patch(id, { reason }); }} onSubmit={() => { if (answer.sel === null) return; patch(id, { submitted: true, answeredOn: TODAY.date }); flowGo('result'); }} />; break;
        case 'result': flow = choice ? <Comments question={question} choice={choice} comments={question.opinions[question.choices.indexOf(choice)].items} answer={answer} profile={state.profile} /> : <Result question={question} sel={answer.sel} onOpen={choiceId => go(`question/${id}/result/${choiceId}`)} next={next} />; break;
        case 'reading': flow = <Reading question={question} next={() => { setState(s => completeAnswer(s, id)); next(); }} />; break;
        case 'done': flow = <Done question={question} answer={answer} go={flowGo} group={fromGroup} onShareGroup={() => shareToGroup(id, fromGroup.id)} />; break;
        case 'share': flow = <Share key={id} question={question} answer={answer} groups={state.groups.filter(g => state.joined.includes(g.id))} onDraft={shareDraft => patch(id, { shareDraft })} onSave={sharedWith => patch(id, { sharedWith, shareDraft: null })} go={go} />; break;
      }
      const back = () => choice && step === 'result' ? flowGo('result') : step === 'share' && prevRoute.current === `question/${id}/done` ? flowGo('done') : previousStep(step) ? flowGo(previousStep(step)) : go(home);
      const position = PROGRESS[step];
      content = <><Header back={back} title={`${id === TODAY.id ? '오늘의 갈래' : '지난 갈래'} · ${dateLabel(question.date)}`} />{position !== undefined && <ol className="progress">{['나의 선택', '다른 생각', '확장하기'].map((label, i) => <li key={label} className={i <= position ? 'on' : ''} aria-current={i === position ? 'step' : undefined}><span />{label}</li>)}</ol>}{flow}</>;
    }
  } else if (section === 'groups' && (!extra || (requestedStep === 'members' && QUESTIONS.some(q => q.id === extra)))) {
    if (!id) content = <Groups state={state} go={go} />;
    else if ((id === 'new' || id === 'join') && !requestedStep) content = <GroupForm key={id} mode={id} state={state} go={go} onCreate={createGroup} onJoin={groupId => { setState(s => ({ ...s, joined: [...s.joined, groupId] })); go(`groups/${groupId}`); }} />;
    else {
      const group = state.groups.find(g => g.id === id && state.joined.includes(id));
      if (group && requestedStep === 'settings' && group.owner && !extra) content = <GroupForm key={`${id}/settings`} mode="edit" group={group} go={go} onSave={fields => { setState(s => ({ ...s, groups: s.groups.map(g => g.id === id ? { ...g, ...fields } : g) })); go(`groups/${id}/members`); }} />;
      else if (group && (!requestedStep || requestedStep === 'members' || QUESTIONS.some(q => q.id === requestedStep))) content = requestedStep === 'members' ? <GroupMembers key={id} group={group} profile={state.profile} questionId={extra} go={go} onLeave={groupId => { setState(s => leaveGroup(s, groupId)); go('groups'); }} /> : <GroupDetail key={`${id}/${requestedStep || ''}`} initialQuestionId={requestedStep} group={group} state={state} go={go} openQuestion={openQuestion} onSend={(questionId, text) => setState(s => addMessage(s, id, questionId, text))} />;
    }
  } else if (section === 'records' && !requestedStep) {
    if (!id) content = <Records answers={state.answers} achieved={state.achieved} comments={state.comments} profile={state.profile} joinedOn={state.joinedOn} go={go} />;
    else if (id === 'comments') content = <><Header back={() => go('records')} title="댓글" /><MyComments comments={state.comments} go={go} /></>;
    else {
      const question = QUESTIONS.find(q => q.id === id);
      if (question && state.answers[id]?.submitted) content = <><Header back={() => go(recordFrom)} /><RecordDetail question={question} answer={state.answers[id]} groups={state.groups} go={go} onRetry={() => { patch(id, emptyAnswer()); go(`question/${id}/answer`); }} /></>;
    }
  } else if (section === 'settings' && !requestedStep) {
    active = 'records';
    if (!id) content = <><Header back={() => go('records')} title="설정" /><Settings profile={state.profile} go={go} onLogout={() => { go('today'); setWelcome('login'); setState(s => ({ ...s, started: false })); }} onReset={() => setState(s => ({ ...s, answers: {}, achieved: {} }))} /></>;
    else if (id === 'profile') {
      // 나 탭의 프로필 줄에서 들어왔으면 나 탭으로, 설정에서 들어왔으면 설정으로 돌아갑니다.
      const profileBack = prevRoute.current === 'records' ? 'records' : 'settings';
      content = <><Header back={() => go(profileBack)} title="프로필" /><ProfileForm profile={state.profile} onSave={profile => { setState(s => ({ ...s, profile })); go(profileBack); }} /></>;
    }
    else if (id === 'sources') content = <><Header back={() => go('settings')} title="출처" /><Sources /></>;
    else if (id === 'onboard') content = <Onboard go={() => go('settings')} />;
  }
  const tabRoot = state.started && (!id || (section === 'feed' && content)) && ['today', 'archive', 'feed', 'groups', 'records'].includes(section);
  const TAB_TITLES = { feed: '생각', archive: '질문', groups: '그룹', records: '내 정보' };
  const tabHeader = <header className="tab-header">{section === 'today' ? <img src="/logo.png" alt="갈래" /> : <span className="tab-title" aria-hidden="true">{TAB_TITLES[section]}</span>}{section === 'records' && <button className="icon-button" aria-label="설정" onClick={() => go('settings')}><Icon name="gear" size={22} /></button>}{section === 'groups' && <GroupsAddMenu go={go} />}</header>;
  if (!content) content = <div className="flow"><h1 className="flow-title" tabIndex={-1}>찾을 수 없어요</h1><button className="btn-primary" onClick={() => go('today')}>오늘로</button></div>;

  return <div className="frame">
    <main ref={mainRef} className={`screen ${state.started && route !== 'settings/onboard' ? 'app-screen' : ''} ${section === 'feed' && state.started ? 'flush' : ''}`} id="main-content" key={state.started ? route : welcome}>
      {storageError && <p className="form-error" role="alert">브라우저에 저장하지 못했어요</p>}{tabRoot && tabHeader}{content}
    </main>{state.started && route !== 'settings/onboard' && <BottomNav active={active} go={go} />}
  </div>;
}
