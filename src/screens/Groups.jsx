import { useState } from 'react';
import { choiceOf, dateLabel } from '../questionHelpers.js';
import { Header, Icon, Avatar, Empty, ProfileLink, PhotoColorPicker, Confirm } from '../components/UI.jsx';
import { joinedGroups, myself } from '../state.js';
import { copyText } from '../platform.js';

export function Groups({ state, go }) {
  const groups = joinedGroups(state);
  return <>
    <h1 className="visually-hidden" tabIndex={-1}>그룹</h1>
    {groups.length ? <div className="list">{groups.map(group => <button className="group-row" key={group.id} onClick={() => go(`groups/${group.id}`)}>
      <div className="group-row-head"><Avatar name={group.name} color={group.color} photo={group.photo} /><strong>{group.name}</strong></div>
      {group.description && <p className="record-note">{group.description}</p>}
      <span className="avatar-stack">{group.members.slice(0, 3).map(m => <Avatar key={m.id} {...m} />)}<small>{group.members.length + 1}명</small></span>
    </button>)}</div> : <Empty title="함께할 첫 그룹을 만나보세요" />}
  </>;
}

export function GroupsAddMenu({ go }) {
  const [open, setOpen] = useState(false);
  return <div className="add-menu-wrap">
    <button className="icon-button" aria-label="그룹 추가" aria-expanded={open} onClick={() => setOpen(!open)}><Icon name="plus" size={22} /></button>
    {open && <>
      <div className="question-backdrop" onClick={() => setOpen(false)} />
      <ul className="question-menu add-menu">
        <li><button onClick={() => go('groups/new')}>만들기</button></li>
        <li><button onClick={() => go('groups/join')}>참여</button></li>
      </ul>
    </>}
  </div>;
}

export function GroupForm({ mode, group, state, onCreate, onJoin, onSave, go }) {
  const editing = mode === 'edit';
  const [value, setValue] = useState(editing ? group.name : '');
  const [description, setDescription] = useState(editing ? group.description || '' : '');
  const [color, setColor] = useState(editing ? group.color : 'sage');
  const [photo, setPhoto] = useState(editing ? group.photo || '' : '');
  const [error, setError] = useState('');
  const creating = mode === 'new' || editing;
  async function submit(e) {
    e.preventDefault();
    const fields = { name: value.trim(), description: description.trim(), color, photo };
    if (editing) { await onSave(fields); return; }
    if (creating) { await onCreate(fields); return; }
    await onJoin(value.trim().toUpperCase());
  }
  return <>
    <Header back={() => go(editing ? `groups/${group.id}/members` : 'groups')} title={editing ? '그룹 설정' : creating ? '그룹 만들기' : '그룹 참여'} />
    <form className="flow" onSubmit={submit}>
      {creating && <PhotoColorPicker name={value.trim() || '갈'} label="그룹 사진" photo={photo} color={color} onPhoto={setPhoto} onColor={setColor} />}
      <div className="field">
        <input className={`note-input ${creating ? '' : 'code-input'}`} aria-label={creating ? '그룹 이름' : '초대 코드'} placeholder={creating ? '이름' : '코드'} maxLength={creating ? 20 : 6} autoCapitalize={creating ? undefined : 'characters'} value={value} onChange={e => { setValue(creating ? e.target.value : e.target.value.toUpperCase()); setError(''); }} />
        {creating && <span className="count">{value.length}/20</span>}
      </div>
      {creating && <div className="field">
        <textarea className="note-input" aria-label="그룹 소개" placeholder="소개" rows={3} maxLength={100} value={description} onChange={e => setDescription(e.target.value)} />
        <span className="count">{description.length}/100</span>
      </div>}
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="btn-primary" disabled={creating ? !value.trim() : value.trim().length !== 6}>{editing ? '저장' : creating ? '만들기' : '참여'}</button>
    </form>
  </>;
}

export function GroupDetail({ group, state, go, openQuestion, initialQuestionId, onSend, onProfile }) {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const QUESTIONS = state.questions;
  const TODAY = state.today;
  const questionId = initialQuestionId || TODAY?.id;
  const question = QUESTIONS.find(q => q.id === questionId);
  const answer = state.answers[questionId];
  const messages = state.messages.filter(m => m.groupId === group.id && m.questionId === questionId);
  async function send(e) { e.preventDefault(); if (!text.trim()) return; if (await onSend(questionId, text)) setText(''); }
  if (!question) return <><Header back={() => go('groups')} title={group.name} /><Empty title="아직 공개된 갈래가 없어요" /></>;
  return <>
    <Header back={() => go('groups')} title={group.name} action={<button className="icon-button" aria-label="멤버" onClick={() => go(`groups/${group.id}/members/${questionId}`)}><Icon name="more" size={22} /></button>} />
    <div className="flow chat-flow">
      <div className="question-picker">
        <button className="question-select" aria-label="질문" aria-expanded={open} onClick={() => setOpen(!open)}>{dateLabel(question.date)} · {question.title}</button>
        {open && <>
          <div className="question-backdrop" onClick={() => setOpen(false)} />
          <ul className="question-menu">{QUESTIONS.map(q => <li key={q.id}><button aria-pressed={q.id === questionId} onClick={() => { setOpen(false); go(`groups/${group.id}/${q.id}`); }}>{dateLabel(q.date)} · {q.title}</button></li>)}</ul>
        </>}
      </div>
        <div className="chat">
          <div className="group-question">
            <strong>{question.title}</strong>
            <p>{question.body}</p>
            {!answer?.submitted && <button className="btn-primary" onClick={() => openQuestion(questionId)}>{answer?.sel != null ? '갈래 이어가기' : questionId === TODAY?.id && TODAY.date === state.todayDate ? '오늘의 갈래 시작하기' : '갈래 시작하기'}</button>}
          </div>
          {messages.map(m => <div className={`bubble-row ${m.mine ? 'mine' : ''}`} key={m.id}>
            {!m.mine && <ProfileLink avatar onClick={() => onProfile(m.author.id)}><Avatar {...m.author} /></ProfileLink>}
            <div className="bubble-wrap">
              {!m.mine && <ProfileLink onClick={() => onProfile(m.author.id)}><span className="bubble-name">{m.author.name}</span></ProfileLink>}
              <div className={`bubble ${m.locked ? 'veiled' : ''}`}>{m.locked ? <><span className="chip" aria-hidden="true">나의 선택</span><p aria-hidden="true">갈래를 고른 뒤에 생각을 나눌 수 있어요.</p><span className="veil">갈래를 선택하면 볼 수 있어요</span></> : <>{m.sel !== undefined && <span className="chip">{choiceOf(question, m.sel)?.short}</span>}{m.text && <p className="preserve-lines">{m.text}</p>}</>}</div>
            </div>
          </div>)}
          {!messages.length && <Empty title="첫 번째 생각을 나눠주세요" />}
        </div>
        <form className="chat-input" onSubmit={send}>
          <input aria-label="메시지" placeholder="메시지" maxLength={300} value={text} onChange={e => setText(e.target.value)} />
          <button className="icon-button" aria-label="보내기" disabled={!text.trim()}><Icon name="send" size={20} /></button>
        </form>
    </div>
  </>;
}

export function GroupMembers({ group, profile, questionId, go, onKick, onLeave, onProfile }) {
  const [copied, setCopied] = useState('');
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [kicking, setKicking] = useState(null);
  const me = myself(profile);
  async function copy() { try { await copyText(group.code); setCopied('복사됨'); } catch { setCopied('복사할 수 없어요'); } }
  return <>
    <Header back={() => go(`groups/${group.id}${questionId ? `/${questionId}` : ''}`)} title={group.name} />
    <div className="flow">
      <div className="invite"><strong>{group.code}</strong><button className="btn-text" onClick={copy}>{copied || '복사'}</button></div>
      <div className="list">
        <div className="list-row"><Avatar {...me} /><span>{me.name}</span><small className="hint">{group.owner ? '그룹장' : '멤버'}</small></div>
        {group.members.map((m, i) => <div className="list-row" key={m.id}><ProfileLink avatar onClick={() => onProfile(m.id)}><Avatar {...m} /></ProfileLink><span><ProfileLink onClick={() => onProfile(m.id)}>{m.name}</ProfileLink></span>{group.owner ? <button className="btn-text muted" onClick={() => setKicking(m)}>내보내기</button> : <small className="hint">{m.owner ? '그룹장' : '멤버'}</small>}</div>)}
      </div>
      <div className="actions">{group.owner && <button className="btn-text" onClick={() => go(`groups/${group.id}/settings`)}>그룹 설정</button>}<button className="btn-text muted" onClick={() => setConfirmLeave(true)}>그룹 나가기</button></div>
      {confirmLeave && <Confirm id="leave-title" action="나가기" onCancel={() => setConfirmLeave(false)} onConfirm={() => onLeave(group.id)}>{group.owner ? <>그룹장이 나가면 그룹이 사라져요.<br />나갈까요?</> : '그룹을 나갈까요?'}</Confirm>}
      {kicking && <Confirm id="kick-title" action="내보내기" onCancel={() => setKicking(null)} onConfirm={async () => { if (await onKick(kicking.id)) setKicking(null); }}>{kicking.name} 님을 내보낼까요?</Confirm>}
    </div>
  </>;
}
