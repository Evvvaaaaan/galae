import { useState } from 'react';
import { Avatar, Empty, shareOrCopy } from '../components/UI.jsx';

export default function Share({ question, answer, groups, onDraft, onSave, go }) {
  const selected = answer.shareDraft ?? answer.sharedWith;
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  async function shareOut() {
    const text = [question.title, question.choices.find(c => c.id === answer.sel)?.text, answer.reason].filter(Boolean).join('\n');
    const url = `${location.origin}${location.pathname}#/question/${question.id}`;
    if (await shareOrCopy({ text, url }, `${text}\n${url}`)) setCopied(true);
  }
  const external = <button className="btn-secondary" onClick={shareOut}>{copied ? '복사됨' : '외부 공유'}</button>;
  function toggle(id) { onDraft(selected.includes(id) ? selected.filter(g => g !== id) : [...selected, id]); setSaved(false); }
  return <div className="flow">
    <h1 className="flow-title" tabIndex={-1}>누구와 나눌까요</h1>
    <div className="record">
      <span className="hint">{question.title}</span>
      <strong>{question.choices.find(c => c.id === answer.sel)?.text}</strong>
      {answer.reason && <p className="preserve-lines">{answer.reason}</p>}
    </div>
    {groups.length ? <>
      <div className="list">{groups.map(group => <label className={`list-row ${selected.includes(group.id) ? 'on' : ''}`} key={group.id}>
        <Avatar name={group.name} color={group.color} /><span>{group.name}</span>
        <small className="hint">{group.members.length + 1}명</small>
        <input type="checkbox" checked={selected.includes(group.id)} onChange={() => toggle(group.id)} />
      </label>)}</div>
      <button className="btn-primary" onClick={() => { onSave(selected); setSaved(true); }}>{saved ? '저장됨' : selected.length ? `${selected.length}개 그룹에 공유하기` : '나만 보기로 저장'}</button>
      {external}
      {saved && <div className="share-links">
        <button className="btn-text" onClick={() => go(selected.length ? `groups/${selected[0]}/${question.id}` : 'records')}>{selected.length ? '그룹에서 보기' : '나의 기록'}</button>
        <button className="btn-text" onClick={() => go('today')}>홈으로</button>
      </div>}
    </> : <><Empty title="아직 함께하는 그룹이 없어요" label="그룹 만나보기" onClick={() => go('groups')} />{external}</>}
  </div>;
}
