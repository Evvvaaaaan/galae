import { createPortal } from 'react-dom';
import { Avatar, Empty } from '../components/UI.jsx';

// 완료·요약 화면 위에 올라오는 공유 시트입니다.
// 체크된 그룹 = 지금 답을 이미 보낸 그룹(풀 수 없음) + 이번에 보낼 그룹(초안).
export default function Share({ answer, groups, sent, onDraft, onSave, onClose, go }) {
  const draft = answer.shareDraft ?? [];
  const selected = [...new Set([...sent, ...draft])];
  function toggle(id) { onDraft(draft.includes(id) ? draft.filter(g => g !== id) : [...draft, id]); }
  return createPortal(<>
    <button className="sheet-backdrop" aria-label="닫기" onClick={onClose} />
    <div className="sheet share-sheet" role="dialog" aria-modal="true" aria-label="공유하기">
      <button className="sheet-handle" aria-label="닫기" onClick={onClose}><span /></button>
      {groups.length ? <>
        <div className="list">{groups.map(group => <label className={`list-row ${selected.includes(group.id) ? 'on' : ''}`} key={group.id}>
          <Avatar name={group.name} color={group.color} photo={group.photo} /><span>{group.name}</span>
          <small className="hint">{group.members.length + 1}명</small>
          <input type="checkbox" checked={selected.includes(group.id)} disabled={sent.includes(group.id)} onChange={() => toggle(group.id)} />
        </label>)}</div>
        <button className="btn-primary" onClick={() => { onSave(draft); onClose(); }}>{selected.length ? `${selected.length}개 그룹에 공유하기` : '나만 보기로 저장'}</button>
      </> : <Empty title="아직 함께하는 그룹이 없어요" label="그룹 만나보기" onClick={() => go('groups')} />}
    </div>
  </>, document.querySelector('.frame'));
}
