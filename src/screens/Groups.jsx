import { useState } from 'react';
import { createPortal } from 'react-dom';
import { QUESTIONS, TODAY, SAMPLE_SHARES, dateLabel } from '../questionData.js';
import { Header, Icon, Avatar, Empty, ProfileLink } from '../components/UI.jsx';
import { COLOR_LABELS, PROFILE_COLORS, myself } from '../store.js';

export function Groups({ state, go }) {
  const groups = state.groups.filter(g => state.joined.includes(g.id));
  return <>
    <h1 className="visually-hidden" tabIndex={-1}>그룹</h1>
    {groups.length ? <div className="list">{groups.map(group => <button className="group-row" key={group.id} onClick={() => go(`groups/${group.id}`)}>
      <div className="group-row-head"><Avatar name={group.name} color={group.color} /><strong>{group.name}</strong></div>
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
  const [error, setError] = useState('');
  const creating = mode === 'new' || editing;
  function submit(e) {
    e.preventDefault();
    const fields = { name: value.trim(), description: description.trim(), color };
    if (editing) { onSave(fields); return; }
    if (creating) { onCreate(fields); return; }
    const group = state.groups.find(g => g.code === value.trim().toUpperCase());
    if (!group) setError('코드를 찾을 수 없어요');
    else if (state.joined.includes(group.id)) setError('이미 참여한 그룹이에요');
    else onJoin(group.id);
  }
  return <>
    <Header back={() => go(editing ? `groups/${group.id}/members` : 'groups')} title={editing ? '그룹 설정' : creating ? '그룹 만들기' : '그룹 참여'} />
    <form className="flow" onSubmit={submit}>
      {creating && <>
        <div className="group-preview"><Avatar name={value.trim() || '갈'} color={color} /></div>
        <div className="color-picker">{PROFILE_COLORS.map(c => <button type="button" key={c} className={c} aria-label={COLOR_LABELS[c]} aria-pressed={color === c} onClick={() => setColor(c)} />)}</div>
      </>}
      <div className="field">
        <input className={`note-input ${creating ? '' : 'code-input'}`} aria-label={creating ? '그룹 이름' : '초대 코드'} placeholder={creating ? '이름' : '코드'} maxLength={creating ? 20 : 6} autoCapitalize={creating ? undefined : 'characters'} value={value} onChange={e => { setValue(creating ? e.target.value : e.target.value.toUpperCase()); setError(''); }} />
        {creating && <span className="count">{value.length}/20</span>}
      </div>
      {!creating && <p className="hint center">체험용 코드 GARA26</p>}
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
  const questionId = initialQuestionId || TODAY.id;
  const question = QUESTIONS.find(q => q.id === questionId);
  const answer = state.answers[questionId];
  const shared = answer?.sharedWith.includes(group.id);
  const me = myself(state.profile);
  const posts = [...SAMPLE_SHARES.filter(s => s.groupId === group.id && s.questionId === questionId && group.members.some(m => m.id === s.memberId)), ...(shared ? [{ memberId: 'me', sel: answer.sel, note: answer.reason }] : [])];
  const messages = state.messages.filter(m => m.groupId === group.id && m.questionId === questionId);
  function send(e) { e.preventDefault(); if (!text.trim()) return; onSend(questionId, text); setText(''); }
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
            {!answer?.submitted && <button className="btn-primary" onClick={() => openQuestion(questionId)}>{answer?.sel != null ? '갈래 이어가기' : questionId === TODAY.id ? '오늘의 갈래 시작하기' : '갈래 시작하기'}</button>}
          </div>
          {posts.map(post => {
            const mine = post.memberId === 'me';
            const veiled = !mine && !answer?.submitted;
            const member = mine ? me : group.members.find(m => m.id === post.memberId) || { name: '멤버', color: 'sage' };
            const link = member.id && (() => onProfile(member.id));
            return <div className={`bubble-row ${mine ? 'mine' : ''}`} key={post.memberId}>
              {!mine && <ProfileLink avatar onClick={link}><Avatar {...member} /></ProfileLink>}
              <div className="bubble-wrap">
                {!mine && <ProfileLink onClick={link}><span className="bubble-name">{member.name}</span></ProfileLink>}
                <div className={`bubble ${veiled ? 'veiled' : ''}`}><span className="chip" aria-hidden={veiled}>{question.choices.find(c => c.id === post.sel)?.short}</span>{post.note && <p className="preserve-lines" aria-hidden={veiled}>{post.note}</p>}{veiled && <span className="veil">갈래를 선택하면 볼 수 있어요</span>}</div>
              </div>
            </div>;
          })}
          {messages.map(m => <div className="bubble-row mine" key={m.id}><div className="bubble-wrap"><div className="bubble"><p className="preserve-lines">{m.text}</p></div></div></div>)}
          {!posts.length && !messages.length && <Empty title="첫 번째 생각을 나눠주세요" />}
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
  async function copy() { try { await navigator.clipboard.writeText(group.code); setCopied('복사됨'); } catch { setCopied('복사할 수 없어요'); } }
  return <>
    <Header back={() => go(`groups/${group.id}${questionId ? `/${questionId}` : ''}`)} title={group.name} />
    <div className="flow">
      <div className="invite"><strong>{group.code}</strong><button className="btn-text" onClick={copy}>{copied || '복사'}</button></div>
      <div className="list">
        <div className="list-row"><Avatar {...me} /><span>{me.name}</span><small className="hint">{group.owner ? '그룹장' : '멤버'}</small></div>
        {group.members.map((m, i) => <div className="list-row" key={m.id}><ProfileLink avatar onClick={() => onProfile(m.id)}><Avatar {...m} /></ProfileLink><span><ProfileLink onClick={() => onProfile(m.id)}>{m.name}</ProfileLink></span>{group.owner ? <button className="btn-text muted" onClick={() => setKicking(m)}>내보내기</button> : <small className="hint">{i === 0 ? '그룹장' : '멤버'}</small>}</div>)}
      </div>
      <div className="actions">{group.owner && <button className="btn-text" onClick={() => go(`groups/${group.id}/settings`)}>그룹 설정</button>}<button className="btn-text muted" onClick={() => setConfirmLeave(true)}>그룹 나가기</button></div>
      {confirmLeave && <Confirm id="leave-title" action="나가기" onCancel={() => setConfirmLeave(false)} onConfirm={() => onLeave(group.id)}>{group.owner ? <>그룹장이 나가면 그룹이 사라져요.<br />나갈까요?</> : '그룹을 나갈까요?'}</Confirm>}
      {kicking && <Confirm id="kick-title" action="내보내기" onCancel={() => setKicking(null)} onConfirm={() => { onKick(kicking.id); setKicking(null); }}>{kicking.name} 님을 내보낼까요?</Confirm>}
    </div>
  </>;
}

function Confirm({ id, action, onCancel, onConfirm, children }) {
  return createPortal(<>
    <button className="sheet-backdrop" aria-label="닫기" onClick={onCancel} />
    <div className="dialog" role="alertdialog" aria-labelledby={id}>
      <p id={id}>{children}</p>
      <div className="dialog-actions"><button className="btn-text" onClick={onCancel}>취소</button><button className="btn-text danger" onClick={onConfirm}>{action}</button></div>
    </div>
  </>, document.querySelector('.frame'));
}
