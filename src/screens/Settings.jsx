import { useState } from 'react';
import { Avatar, PhotoColorPicker, SourceItem } from '../components/UI.jsx';
import { cleanHandle, myself } from '../store.js';
import { TOPICS } from '../topics.js';

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
