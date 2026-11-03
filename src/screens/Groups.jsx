import { useState } from 'react';
import { QUESTIONS, TODAY, SAMPLE_SHARES, dateLabel } from '../questionData.js';
import { Header, Icon, Avatar, Empty } from '../components/UI.jsx';

export function Groups({ state, go }) {
  const groups = state.groups.filter(g => state.joined.includes(g.id));
  return <>
    <h1 className="visually-hidden" tabIndex={-1}>그룹</h1>
    <div className="groups-actions">
      <button className="btn-text" onClick={() => go('groups/new')}>만들기</button>
      <button className="btn-text" onClick={() => go('groups/join')}>참여</button>
    </div>
    {groups.length ? <div className="list">{groups.map(group => <button className="group-row" key={group.id} onClick={() => go(`groups/${group.id}`)}>
      <div className="group-row-head"><Avatar name={group.name} color={group.color} /><strong>{group.name}</strong></div>
      {group.description && <p className="record-note">{group.description}</p>}
      <span className="avatar-stack">{group.members.slice(0, 3).map(m => <Avatar key={m.id} {...m} />)}<small>{group.members.length + 1}명</small></span>
    </button>)}</div> : <Empty title="함께할 첫 그룹을 만나보세요" />}
  </>;
}

const COLORS = [['sage', '초록'], ['blue', '파랑'], ['peach', '살구'], ['lilac', '보라']];

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
        <div className="color-picker">{COLORS.map(([c, label]) => <button type="button" key={c} className={c} aria-label={label} aria-pressed={color === c} onClick={() => setColor(c)} />)}</div>
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

export function GroupDetail({ group, state, go, openQuestion, initialQuestionId, onShare, onSend }) {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const questionId = initialQuestionId || TODAY.id;
  const question = QUESTIONS.find(q => q.id === questionId);
  const answer = state.answers[questionId];
  const shared = answer?.sharedWith.includes(group.id);
  const me = { name: state.profile.name || '나', color: state.profile.color };
  const posts = [...SAMPLE_SHARES.filter(s => s.groupId === group.id && s.questionId === questionId), ...(shared ? [{ memberId: 'me', sel: answer.sel, note: answer.reason }] : [])];
  const messages = state.messages.filter(m => m.groupId === group.id && m.questionId === questionId);
  function send(e) { e.preventDefault(); if (!text.trim()) return; onSend(questionId, text); setText(''); }
  return <>
    <Header back={() => go('groups')} title={group.name} action={<button className="icon-button" aria-label="멤버" onClick={() => go(`groups/${group.id}/members/${questionId}`)}><Icon name="more" size={22} /></button>} />
    <div className="flow chat-flow">
      <div className="row">
        <span className="avatar-stack">{group.members.slice(0, 3).map(m => <Avatar key={m.id} {...m} />)}<small>{group.members.length + 1}명</small></span>
      </div>
      {group.description && <p className="group-description">{group.description}</p>}
      <div className="question-picker">
        <button className="question-select" aria-label="질문" aria-expanded={open} onClick={() => setOpen(!open)}>{dateLabel(question.date)} · {question.title}</button>
        {open && <>
          <div className="question-backdrop" onClick={() => setOpen(false)} />
          <ul className="question-menu">{QUESTIONS.map(q => <li key={q.id}><button aria-pressed={q.id === questionId} onClick={() => { setOpen(false); go(`groups/${group.id}/${q.id}`); }}>{dateLabel(q.date)} · {q.title}</button></li>)}</ul>
        </>}
      </div>
      <div className="group-question">
        <span className="hint">{question.category}</span>
        <strong>{question.title}</strong>
        <p>{question.body}</p>
      </div>
      {!answer?.submitted ? <div className="locked">
        <button className="btn-primary" onClick={() => openQuestion(questionId)}>답변하기</button>
      </div> : <>
        <div className="distribution">{question.choices.map(c => <span key={c.id}>{c.short} <strong>{posts.filter(p => p.sel === c.id).length}</strong></span>)}</div>
        {!shared && <button className="btn-text group-share" onClick={() => onShare(questionId)}>내 답변 나누기</button>}
        <div className="chat">
          {posts.map(post => {
            const mine = post.memberId === 'me';
            const member = mine ? me : group.members.find(m => m.id === post.memberId) || { name: '멤버', color: 'sage' };
            return <div className={`bubble-row ${mine ? 'mine' : ''}`} key={post.memberId}>
              {!mine && <Avatar {...member} />}
              <div className="bubble-wrap">
                {!mine && <span className="bubble-name">{member.name}</span>}
                <div className="bubble"><span className="chip">{question.choices.find(c => c.id === post.sel)?.short}</span>{post.note && <p className="preserve-lines">{post.note}</p>}</div>
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
      </>}
    </div>
  </>;
}

export function GroupMembers({ group, profile, questionId, answer, go, onLeave }) {
  const [copied, setCopied] = useState('');
  const [confirmLeave, setConfirmLeave] = useState(false);
  async function copy() { try { await navigator.clipboard.writeText(group.code); setCopied('복사됨'); } catch { setCopied('복사할 수 없어요'); } }
  return <>
    <Header back={() => go(`groups/${group.id}${questionId ? `/${questionId}` : ''}`)} title={group.name} />
    <div className="flow">
      <div className="invite"><strong>{group.code}</strong><button className="btn-text" onClick={copy}>{copied || '복사'}</button></div>
      <div className="list">
        <div className="list-row"><Avatar name={profile.name || '나'} color={profile.color} /><span>{profile.name || '나'}</span><small className="hint">{group.owner ? '그룹장' : '멤버'}</small></div>
        {group.members.map((m, i) => <div className="list-row" key={m.id}><Avatar {...m} /><span>{m.name}</span><small className="hint">{!group.owner && i === 0 ? '그룹장' : '멤버'}</small></div>)}
      </div>
      {answer?.submitted && <button className="btn-text" onClick={() => go(`question/${questionId}/share`)}>{answer.sharedWith.includes(group.id) ? '공유 관리' : '내 답변 나누기'}</button>}
      {group.owner && <button className="btn-text" onClick={() => go(`groups/${group.id}/settings`)}>그룹 설정</button>}
      <div className="actions">{confirmLeave
        ? <><button className="btn-text danger" onClick={() => onLeave(group.id)}>나가기</button><button className="btn-text" onClick={() => setConfirmLeave(false)}>취소</button></>
        : <button className="btn-text muted" onClick={() => setConfirmLeave(true)}>그룹 나가기</button>}</div>
    </div>
  </>;
}
