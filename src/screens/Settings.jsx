import { useState } from 'react';
import { Avatar } from '../components/UI.jsx';
import { COLOR_LABELS, PROFILE_COLORS, cleanHandle, myself } from '../store.js';
import { TOPICS } from './Feed.jsx';

export function Settings({ profile, go, onLogout, onReset }) {
  const [confirmReset, setConfirmReset] = useState(false);
  const me = myself(profile);
  return <div className="flow">
    <div className="list">
      <button className="list-row" onClick={() => go('settings/profile')}><Avatar {...me} /><span>{me.name}</span></button>
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
  const [handle, setHandle] = useState(profile.handle);
  const [bio, setBio] = useState(profile.bio);
  const [photo, setPhoto] = useState(profile.photo);
  const [color, setColor] = useState(profile.color);
  // 저장 공간을 아끼려고 정사각형 256px JPEG로 줄여 둡니다.
  function pick(file) {
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const size = Math.min(img.width, img.height);
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 256;
      canvas.getContext('2d').drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, 256, 256);
      setPhoto(canvas.toDataURL('image/jpeg', 0.85));
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  }
  return <form className="flow" onSubmit={e => { e.preventDefault(); onSave({ name: name.trim(), handle, bio: bio.trim(), photo, color }); }}>
    <div className="group-preview">
      <label className="photo-pick"><Avatar name={name.trim() || '나'} color={color} photo={photo} /><input type="file" accept="image/*" aria-label="프로필 사진" className="visually-hidden" onChange={e => { pick(e.target.files[0]); e.target.value = ''; }} /></label>
      {photo && <button type="button" className="btn-text muted" onClick={() => setPhoto('')}>사진 삭제</button>}
    </div>
    <div className="color-picker">{PROFILE_COLORS.map(c => <button type="button" key={c} className={c} aria-label={COLOR_LABELS[c]} aria-pressed={color === c} onClick={() => setColor(c)} />)}</div>
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
      {sources.map(s => <li key={s.label}>{s.url ? <a href={s.url} target="_blank" rel="noreferrer">{s.label}</a> : s.label}</li>)}
    </ul>
  </div>;
}
