import { useState } from 'react';
import { Header } from '../components/UI.jsx';

// 가입과 로그인 화면입니다. 비밀번호 확인과 저장은 서버를 붙일 때 연결합니다.
export default function Account({ mode, back, onDone }) {
  const signup = mode === 'signup';
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  function submit(e) {
    e.preventDefault();
    if (password.length < 8) { setError('비밀번호는 8자 이상이에요'); return; }
    onDone({ handle, name: name.trim() });
  }
  return <>
    <Header back={back} title={signup ? '가입' : '로그인'} />
    <form className="flow" onSubmit={submit}>
      {/* 아이디는 영문 소문자, 숫자, 마침표, 밑줄만 씁니다. */}
      <input className="note-input" aria-label="아이디" placeholder="아이디" maxLength={20} autoComplete="username" autoCapitalize="none" autoCorrect="off" spellCheck={false} value={handle} onChange={e => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9._]/g, ''))} />
      <input className="note-input" type="password" aria-label="비밀번호" placeholder="비밀번호" autoComplete={signup ? 'new-password' : 'current-password'} value={password} onChange={e => { setPassword(e.target.value); setError(''); }} />
      {signup && <input className="note-input" aria-label="이름" placeholder="이름" maxLength={10} autoComplete="nickname" value={name} onChange={e => setName(e.target.value)} />}
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="btn-primary" disabled={!handle || !password || (signup && !name.trim())}>{signup ? '가입' : '로그인'}</button>
    </form>
  </>;
}
