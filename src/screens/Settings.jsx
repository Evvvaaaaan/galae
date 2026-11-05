import { useState } from 'react';
import { Avatar, PhotoColorPicker, SourceItem } from '../components/UI.jsx';
import { cleanHandle, myself } from '../store.js';

export function Settings({ profile, go, onLogout }) {
  const me = myself(profile);
  return <div className="flow">
    <div className="list">
      <button className="list-row" onClick={() => go('settings/profile')}><Avatar {...me} /><span>{me.name}</span></button>
    </div>
    <div className="list">
      <button className="list-row" onClick={onLogout}>로그아웃</button>
      <button className="list-row" onClick={() => go('settings/withdraw')}>탈퇴</button>
    </div>
    <div className="list">
      <button className="list-row" onClick={() => go('settings/onboard')}>갈래 소개</button>
      <button className="list-row" onClick={() => go('settings/sources')}>출처</button>
      <button className="list-row" disabled>이용약관</button>
      <button className="list-row" disabled>개인정보처리방침</button>
      <button className="list-row" disabled>문의</button>
    </div>

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
  return <form className="flow" onSubmit={async e => { e.preventDefault(); await onSave({ name: name.trim(), handle, bio: bio.trim(), photo, color }); }}>
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
