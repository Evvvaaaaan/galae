import { Fragment, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Avatar, PhotoColorPicker, SourceItem, Confirm } from '../components/UI.jsx';
import { cleanHandle, myself } from '../store.js';
import TERMS from '../../docs/legal/TERMS.md?raw';
import PRIVACY from '../../docs/legal/PRIVACY.md?raw';
import CONTACT from '../../docs/legal/CONTACT.md?raw';

export function Settings({ profile, go, onLogout }) {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const me = myself(profile);
  return <div className="flow">
    <div className="list">
      <button className="list-row" onClick={() => go('settings/profile')}><Avatar {...me} /><span>{me.name}</span></button>
      <button className="list-row" onClick={() => go('settings/notify')}>알림</button>
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
      <button className="list-row" onClick={() => go('settings/withdraw')}>탈퇴</button>
    </div>
    {confirmLogout && <Confirm id="logout-title" action="로그아웃" onCancel={() => setConfirmLogout(false)} onConfirm={onLogout}>로그아웃할까요?</Confirm>}
  </div>;
}

const ROW = 40;
const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);
const timeLabel = time => { const [h, m] = time.split(':').map(Number); return `${h < 12 ? '오전' : '오후'} ${h % 12 || 12}:${String(m).padStart(2, '0')}`; };

// 위아래로 돌려 고르는 한 줄입니다. 가운데 칸이 고른 값입니다.
function Wheel({ items, index, onChange, label }) {
  const ref = useRef(null);
  useEffect(() => { ref.current.scrollTop = index * ROW; }, []);
  return <div className="wheel-col" ref={ref} aria-label={label} onScroll={e => onChange(Math.min(items.length - 1, Math.max(0, Math.round(e.currentTarget.scrollTop / ROW))))}>
    {items.map((item, i) => <div key={item} className={i === index ? 'on' : ''} onClick={() => ref.current.scrollTo({ top: i * ROW, behavior: 'smooth' })}>{item}</div>)}
  </div>;
}

function TimeSheet({ time, onSave, onClose }) {
  const [h, m] = time.split(':').map(Number);
  const [ampm, setAmpm] = useState(h < 12 ? 0 : 1);
  const [hour, setHour] = useState((h % 12 || 12) - 1);
  const [minute, setMinute] = useState(Math.min(11, Math.round(m / 5)));
  const save = () => onSave(`${String((HOURS[hour] % 12) + ampm * 12).padStart(2, '0')}:${String(MINUTES[minute]).padStart(2, '0')}`);
  return createPortal(<>
    <button className="sheet-backdrop" aria-label="닫기" onClick={onClose} />
    <div className="sheet share-sheet" role="dialog" aria-modal="true" aria-label="시간">
      <button className="sheet-handle" aria-label="닫기" onClick={onClose}><span /></button>
      <div className="wheel">
        <Wheel label="오전 오후" items={['오전', '오후']} index={ampm} onChange={setAmpm} />
        <Wheel label="시" items={HOURS} index={hour} onChange={setHour} />
        <Wheel label="분" items={MINUTES.map(n => String(n).padStart(2, '0'))} index={minute} onChange={setMinute} />
      </div>
      <button className="btn-primary" onClick={save}>저장</button>
    </div>
  </>, document.querySelector('.frame'));
}

export function NotifySettings({ notify, onChange }) {
  const [picking, setPicking] = useState(false);
  const row = (key, label, desc) => <label className="list-row notify-row"><span>{label}<small className="hint">{desc}</small></span><input type="checkbox" className="switch" checked={notify[key]} onChange={e => onChange({ ...notify, [key]: e.target.checked })} /></label>;
  return <div className="flow">
    <figure className="notify-preview">
      <div className="banner" aria-hidden="true">
        <img className="banner-icon" src="/icon-192.png" alt="" />
        <span><strong>갈래</strong><small>지금</small><p>새로운 갈래가 도착했어요.</p></span>
      </div>
      <figcaption className="hint">이렇게 표시됩니다.</figcaption>
    </figure>
    <div className="list">
      {row('question', '오늘의 질문', '매일 정한 시간에 갈래를 전달해드려요.')}
      {notify.question && <button className="list-row notify-row" onClick={() => setPicking(true)}><span>시간</span><small className="time-value">{timeLabel(notify.time)}</small></button>}
    </div>
    <div className="list">
      {row('share', '그룹 공유', '그룹에 누군가 답을 나눴을 때 알려드려요.')}
      {row('chat', '그룹 대화', '그룹 대화에 새 메시지가 왔을 때 알려드려요.')}
      {row('comment', '답글·공감', '내 댓글에 답글이나 공감이 달렸을 때 알려드려요.')}
    </div>
    {picking && <TimeSheet time={notify.time} onClose={() => setPicking(false)} onSave={time => { onChange({ ...notify, time }); setPicking(false); }} />}
  </div>;
}

export function WithdrawForm({ onWithdraw }) {
  const [password, setPassword] = useState('');
  return <form className="flow" onSubmit={async e => { e.preventDefault(); await onWithdraw(password); }}>
    <p className="sub">탈퇴하면 내 프로필, 답변, 댓글과 메시지가 삭제됩니다. 내가 그룹장인 그룹도 삭제되며 되돌릴 수 없습니다.</p>
    <input className="note-input" type="password" aria-label="현재 비밀번호" placeholder="현재 비밀번호" autoComplete="current-password" maxLength={72} value={password} onChange={e => setPassword(e.target.value)} />
    <button className="btn-primary" disabled={!password}>탈퇴하기</button>
  </form>;
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

export function Sources({ topics: TOPICS }) {
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
