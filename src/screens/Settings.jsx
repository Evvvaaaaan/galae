import { useState } from 'react';
import { Avatar } from '../components/UI.jsx';
import { PROFILE_COLORS } from '../store.js';
import { TOPICS } from './Feed.jsx';

const COLOR_LABELS = { sage: '초록', blue: '파랑', peach: '살구', lilac: '보라' };

export function Settings({ profile, go, onLogout, onReset }) {
  const [confirmReset, setConfirmReset] = useState(false);
  return <div className="flow">
    <h1 className="visually-hidden" tabIndex={-1}>설정</h1>
    <div className="list">
      <button className="list-row" onClick={() => go('settings/profile')}><Avatar name={profile.name || '나'} color={profile.color} /><span>{profile.name || '나'}</span></button>
      <button className="list-row" disabled>알림</button>
    </div>
    <div className="list">
      <button className="list-row" disabled>계정 연결</button>
      <button className="list-row" onClick={onLogout}>로그아웃</button>
      <button className="list-row" disabled>탈퇴</button>
    </div>
    <div className="list">
      <button className="list-row" onClick={() => go('settings/onboard')}>갈래 소개</button>
      <button className="list-row" onClick={() => go('settings/sources')}>출처</button>
      <button className="list-row" disabled>이용약관</button>
      <button className="list-row" disabled>개인정보처리방침</button>
      <button className="list-row" disabled>문의</button>
    </div>
    {/* 개발·시연용: 답변 기록만 지워 처음부터 다시 체험합니다. 서버 연동 시 제거합니다. */}
    <div className="actions">{confirmReset
      ? <><button className="btn-text danger" onClick={() => { onReset(); setConfirmReset(false); }}>초기화</button><button className="btn-text" onClick={() => setConfirmReset(false)}>취소</button></>
      : <button className="btn-text muted" onClick={() => setConfirmReset(true)}>기록 초기화</button>}</div>
  </div>;
}

export function ProfileForm({ profile, onSave }) {
  const [name, setName] = useState(profile.name);
  const [color, setColor] = useState(profile.color);
  return <form className="flow" onSubmit={e => { e.preventDefault(); onSave({ name: name.trim(), color }); }}>
    <h1 className="visually-hidden" tabIndex={-1}>프로필</h1>
    <div className="group-preview"><Avatar name={name.trim() || '나'} color={color} /></div>
    <div className="color-picker">{PROFILE_COLORS.map(c => <button type="button" key={c} className={c} aria-label={COLOR_LABELS[c]} aria-pressed={color === c} onClick={() => setColor(c)} />)}</div>
    <input className="note-input" aria-label="이름" placeholder="이름" maxLength={10} value={name} onChange={e => setName(e.target.value)} />
    <button className="btn-primary">저장</button>
  </form>;
}

export function Sources() {
  const sources = [...new Map(TOPICS.flatMap(t => t.sources).map(s => [s.label, s])).values()];
  return <div className="flow">
    <h1 className="visually-hidden" tabIndex={-1}>출처</h1>
    <ul className="feed-sources source-list">
      <li>성경 · 개역한글</li>
      {sources.map(s => <li key={s.label}>{s.url ? <a href={s.url} target="_blank" rel="noreferrer">{s.label}</a> : s.label}</li>)}
    </ul>
  </div>;
}
