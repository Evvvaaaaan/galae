import { Fragment, useState } from 'react';
import { Avatar, PhotoColorPicker, SourceItem, Confirm } from '../components/UI.jsx';
import { cleanHandle, myself } from '../state.js';
import { copyText } from '../platform.js';
import TERMS from '../../docs/legal/TERMS.md?raw';
import PRIVACY from '../../docs/legal/PRIVACY.md?raw';
import CONTACT from '../../docs/legal/CONTACT.md?raw';

export function Settings({ profile, go, onLogout }) {
  const [confirmLogout, setConfirmLogout] = useState(false);
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
      <button className="list-row" onClick={() => go('settings/safety')}>신고 및 차단</button>
    </div>
    <div className="list">
      <button className="list-row" onClick={() => setConfirmLogout(true)}>로그아웃</button>
      <button className="list-row" onClick={() => go('settings/withdraw')}>탈퇴</button>
    </div>
    {confirmLogout && <Confirm id="logout-title" action="로그아웃" onCancel={() => setConfirmLogout(false)} onConfirm={onLogout}>로그아웃할까요?</Confirm>}
  </div>;
}

// Reports use the support mailbox; blocking remains a separate server action.
const SUPPORT_MAIL = 'vmfhrmfoald36@gmail.com';
const REASONS = ['욕설·혐오 표현', '스팸·광고', '사칭', '개인정보 노출', '기타'];

export function Safety({ go }) {
  return <div className="flow">
    <div className="list">
      <button className="list-row" onClick={() => go('settings/report')}>신고하기</button>
      <button className="list-row" onClick={() => go('settings/blocks')}>차단한 사용자</button>
    </div>
    <p className="sub">신고는 운영팀에 이메일로 보내 주세요. 사용자 차단은 해당 사용자의 프로필에서 할 수 있고, 차단한 사람의 댓글과 메시지는 내 화면에 보이지 않습니다.</p>
  </div>;
}

export function ReportForm({ profile, go }) {
  const [target, setTarget] = useState('');
  const [reason, setReason] = useState('');
  const [detail, setDetail] = useState('');
  const [prepared, setPrepared] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');
  const subject = `[갈래 신고] ${reason}`;
  const body = [`신고 대상: ${target.trim()}`, `사유: ${reason}`, `내용: ${detail.trim()}`, `신고한 사람: @${profile.handle}`].join('\n');
  function submit(event) {
    event.preventDefault();
    if (target.trim() && reason && detail.trim()) setPrepared(true);
  }
  if (prepared) return <div className="flow">
    <p className="sub">아래 버튼으로 메일 앱을 연 뒤 보내기를 눌러 주세요. 이 화면에서는 신고가 전송되지 않습니다. 메일 앱이 없으면 신고 내용을 복사해 아래 주소로 보내 주세요.</p>
    <p className="sub"><strong>{SUPPORT_MAIL}</strong></p>
    <a className="btn-primary" href={`mailto:${SUPPORT_MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}>메일 앱으로 신고 작성</a>
    <button className="btn-secondary" onClick={async () => {
      try { await copyText(`${subject}\n${body}`); setCopied(true); setCopyError(''); }
      catch { setCopyError('복사하지 못했어요. 신고 내용으로 돌아가 확인해 주세요'); }
    }}>{copied ? '복사했어요' : '신고 내용 복사'}</button>
    {copyError && <p className="form-error" role="alert">{copyError}</p>}
    <button className="btn-text" onClick={() => setPrepared(false)}>신고 내용 수정</button>
    <button className="btn-text" onClick={() => go('settings/safety')}>신고 및 차단으로</button>
  </div>;
  return <form className="flow" onSubmit={submit}>
    <p className="sub">아이디나 그룹 이름, 신고할 글과 사유를 적어 주세요. 다음 화면에서 운영팀에 보낼 이메일을 작성할 수 있습니다. 신고만으로 사용자가 차단되지는 않습니다.</p>
    <input className="note-input" aria-label="신고할 아이디" placeholder="신고할 아이디 (예: mina)" maxLength={40} value={target} onChange={e => setTarget(e.target.value)} />
    <div className="choices" role="group" aria-label="신고 사유">
      {REASONS.map(r => <button type="button" key={r} className={`choice${reason === r ? ' on' : ''}`} aria-pressed={reason === r} onClick={() => setReason(r)}><span>{r}</span></button>)}
    </div>
    <textarea className="note-input" aria-label="신고 내용" placeholder="어떤 일이 있었는지 적어 주세요" rows={5} maxLength={500} value={detail} onChange={e => setDetail(e.target.value)} />
    <button className="btn-primary" disabled={!target.trim() || !reason || !detail.trim()}>신고 내용 확인</button>
  </form>;
}

export function BlockedUsers({ blocks, onUnblock }) {
  if (!blocks.length) return <div className="flow"><p className="sub">차단한 사용자가 없어요. 다른 사람 프로필에서 차단할 수 있어요.</p></div>;
  return <div className="flow">
    <p className="sub">차단한 사람의 댓글과 메시지는 내 화면에 보이지 않습니다.</p>
    <div className="list">{blocks.map(block => <div className="list-row" key={block.id}>
      <Avatar {...block} />
      <span>{block.name || block.handle} <small className="hint">@{block.handle}</small></span>
      <button className="btn-text danger" onClick={() => onUnblock(block.handle)}>차단 해제</button>
    </div>)}</div>
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
    <button className="btn-primary" disabled={!name.trim() || !cleanHandle(handle)}>저장</button>
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
    const last = blocks[blocks.length - 1];
    // 들여 쓴 "- "는 바로 위 목록 항목의 하위 목록입니다.
    if (/^\s+- /.test(line) && (last?.kind === 'ul' || last?.kind === 'ol')) { last.items[last.items.length - 1].sub.push(line.trim().slice(2)); continue; }
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
