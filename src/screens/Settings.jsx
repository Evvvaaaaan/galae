import { Fragment, useState } from 'react';
import { Avatar, PhotoColorPicker, SourceItem, Confirm } from '../components/UI.jsx';
import { cleanHandle, myself } from '../store.js';
import { TOPICS } from '../topics.js';
import TERMS from '../../docs/legal/TERMS.md?raw';
import PRIVACY from '../../docs/legal/PRIVACY.md?raw';
import CONTACT from '../../docs/legal/CONTACT.md?raw';

export function Settings({ profile, go, onLogout, onWithdraw, onReset }) {
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);
  const me = myself(profile);
  return <div className="flow">
    <div className="list">
      <button className="list-row" onClick={() => go('settings/profile')}><Avatar {...me} /><span>{me.name}</span></button>
    </div>
    <div className="list">
      <button className="list-row" onClick={() => go('settings/onboard')}>갈래 소개</button>
      <button className="list-row" onClick={() => go('settings/sources')}>출처</button>
      <button className="list-row" onClick={() => go('settings/terms')}>이용약관</button>
      <button className="list-row" onClick={() => go('settings/privacy')}>개인정보처리방침</button>
      <button className="list-row" onClick={() => go('settings/contact')}>문의</button>
    </div>
    <div className="list">
      <button className="list-row" onClick={() => setConfirmLogout(true)}>로그아웃</button>
      <button className="list-row" onClick={() => setConfirmWithdraw(true)}>탈퇴</button>
    </div>
    {confirmLogout && <Confirm id="logout-title" action="로그아웃" onCancel={() => setConfirmLogout(false)} onConfirm={onLogout}>로그아웃할까요?</Confirm>}
    {confirmWithdraw && <Confirm id="withdraw-title" action="탈퇴" onCancel={() => setConfirmWithdraw(false)} onConfirm={onWithdraw}>탈퇴하면 기록이 모두 지워져요. 탈퇴할까요?</Confirm>}
    {/* 개발·시연용: 답변 기록만 지워 처음부터 다시 체험합니다. 서버 연동 시 제거합니다. */}
    <div className="actions">{confirmReset
      ? <><button className="btn-text danger" onClick={() => { onReset(); setConfirmReset(false); }}>초기화</button><button className="btn-text" onClick={() => setConfirmReset(false)}>취소</button></>
      : <button className="btn-text muted" onClick={() => setConfirmReset(true)}>기록 초기화(개발용)</button>}</div>
  </div>;
}

export function ProfileForm({ profile, onSave }) {
  const [name, setName] = useState(profile.name);
  const [handle, setHandle] = useState(profile.handle);
  const [bio, setBio] = useState(profile.bio);
  const [photo, setPhoto] = useState(profile.photo);
  const [color, setColor] = useState(profile.color);
  return <form className="flow" onSubmit={e => { e.preventDefault(); onSave({ name: name.trim(), handle, bio: bio.trim(), photo, color }); }}>
    <PhotoColorPicker name={name.trim() || '나'} label="프로필 사진" photo={photo} color={color} onPhoto={setPhoto} onColor={setColor} />
    <input className="note-input" aria-label="이름" placeholder="이름" maxLength={10} value={name} onChange={e => setName(e.target.value)} />
    <input className="note-input" aria-label="아이디" placeholder="아이디" maxLength={20} autoCapitalize="none" autoCorrect="off" spellCheck={false} value={handle} onChange={e => setHandle(cleanHandle(e.target.value))} />
    <textarea className="note-input" aria-label="소개" placeholder="소개" rows={3} maxLength={80} value={bio} onChange={e => setBio(e.target.value)} />
    <button className="btn-primary">저장</button>
  </form>;
}

export function Sources() {
  const sources = [...new Map(TOPICS.flatMap(t => t.sources).map(s => [s.label, s])).values()];
  return <div className="flow">
    <ul className="feed-sources source-list">
      <li>성경 · 개역한글</li>
      {sources.map(s => <SourceItem key={s.label} source={s} />)}
    </ul>
  </div>;
}

// docs/legal의 마크다운을 보여 줍니다. 제목(#)과 인용문(>)은 문서용 메모라 뺍니다.
const LEGAL = { terms: TERMS, privacy: PRIVACY, contact: CONTACT };
const inline = text => text.split(/\*\*(.+?)\*\*/).map((part, i) => i % 2 ? <strong key={i}>{part}</strong> : part);

export function LegalDoc({ doc }) {
  const blocks = [];
  for (const line of LEGAL[doc].split('\n')) {
    const last = blocks.at(-1);
    // 들여 쓴 "- "는 바로 위 목록 항목의 하위 목록입니다.
    if (/^\s+- /.test(line) && (last?.kind === 'ul' || last?.kind === 'ol')) { last.items.at(-1).sub.push(line.trim().slice(2)); continue; }
    const kind = /^#{2,} /.test(line) ? 'h2' : /^- /.test(line) ? 'ul' : /^\d+\. /.test(line) ? 'ol' : line.startsWith('|') ? 'table' : line.trim() && !/^(# |>)/.test(line) ? 'p' : null;
    if (!kind) { blocks.push(null); continue; }
    const item = { text: line.replace(/^(#+ |- |\d+\. )/, '').trim(), sub: [] };
    if (kind !== 'h2' && last?.kind === kind) last.items.push(item);
    else blocks.push({ kind, items: [item] });
  }
  const rows = items => items.map(r => r.text).filter(r => !/^\|[\s|-]+\|$/.test(r)).map(r => r.slice(1, -1).split('|').map(c => c.trim()));
  return <div className="flow legal">{blocks.filter(Boolean).map((b, i) => {
    if (b.kind === 'h2') return <h2 key={i}>{b.items[0].text}</h2>;
    if (b.kind === 'p') return <p key={i}>{b.items.map((t, j) => <Fragment key={j}>{j > 0 && <br />}{inline(t.text)}</Fragment>)}</p>;
    if (b.kind === 'table') { const [head, ...body] = rows(b.items); return <div key={i} className="legal-table"><table><thead><tr>{head.map(c => <th key={c}>{c}</th>)}</tr></thead><tbody>{body.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}>{inline(c)}</td>)}</tr>)}</tbody></table></div>; }
    const List = b.kind;
    return <List key={i}>{b.items.map((t, j) => <li key={j}>{inline(t.text)}{t.sub.length > 0 && <ul>{t.sub.map((x, k) => <li key={k}>{inline(x)}</li>)}</ul>}</li>)}</List>;
  })}</div>;
}
