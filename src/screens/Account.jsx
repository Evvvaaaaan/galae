import { useState } from 'react';
import { Header } from '../components/UI.jsx';
import { cleanHandle } from '../store.js';

export default function Account({ mode, back, onDone }) {
  const signup = mode === 'signup';
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  async function submit(e) {
    e.preventDefault();
    if (password.length < 8) { setError('비밀번호는 8자 이상이에요'); return; }
    if (password.length > 72) { setError('비밀번호는 72자 이내로 입력해 주세요'); return; }
    await onDone({ handle, password, ...(signup && { name: name.trim() }) });
  }
  return <>
    <Header back={back} title={signup ? '가입' : '로그인'} />
    <form className="flow" onSubmit={submit}>
      <input className="note-input" aria-label="아이디" placeholder="아이디" maxLength={20} autoComplete="username" autoCapitalize="none" autoCorrect="off" spellCheck={false} value={handle} onChange={e => setHandle(cleanHandle(e.target.value))} />
      <input className="note-input" type="password" aria-label="비밀번호" placeholder="비밀번호" autoComplete={signup ? 'new-password' : 'current-password'} value={password} onChange={e => { setPassword(e.target.value); setError(''); }} />
      {signup && <input className="note-input" aria-label="이름" placeholder="이름" maxLength={10} autoComplete="nickname" value={name} onChange={e => setName(e.target.value)} />}
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="btn-primary" disabled={!handle || !password || (signup && !name.trim())}>{signup ? '가입' : '로그인'}</button>
    </form>
  </>;
}
