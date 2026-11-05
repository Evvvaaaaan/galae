import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Header } from '../components/UI.jsx';
import { cleanHandle } from '../store.js';
import { LegalDoc } from './Settings.jsx';

function LegalSheet({ doc, title, onClose }) {
  useEffect(() => {
    const onKey = event => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  return createPortal(<>
    <button className="sheet-backdrop" aria-label="닫기" onClick={onClose} />
    <section className="sheet legal-sheet" role="dialog" aria-modal="true" aria-label={title}>
      <div className="legal-sheet-head">
        <h2>{title}</h2>
        <button type="button" className="btn-text" onClick={onClose}>닫기</button>
      </div>
      <div className="legal-sheet-body"><LegalDoc doc={doc} /></div>
    </section>
  </>, document.querySelector('.frame') || document.body);
}

export default function Account({ mode, back, onDone }) {
  const signup = mode === 'signup';
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState(false);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [legal, setLegal] = useState(null);
  const [error, setError] = useState('');
  const agreed = !signup || (age && terms && privacy);
  async function submit(e) {
    e.preventDefault();
    if (signup && !agreed) { setError('가입 전 필수 항목을 확인해 주세요'); return; }
    if (password.length < 8) { setError('비밀번호는 8자 이상이에요'); return; }
    if (password.length > 72) { setError('비밀번호는 72자 이내로 입력해 주세요'); return; }
    await onDone({ handle: cleanHandle(handle), password, ...(signup && { name: name.trim() }) });
  }
  return <>
    <Header back={back} title={signup ? '가입' : '로그인'} />
    <form className="flow" onSubmit={submit}>
      <input className="note-input" aria-label="아이디" placeholder="아이디" maxLength={20} autoComplete="username" autoCapitalize="none" autoCorrect="off" spellCheck={false} value={handle} onChange={e => setHandle(e.nativeEvent.isComposing ? e.target.value : cleanHandle(e.target.value))} onBlur={() => setHandle(value => cleanHandle(value))} />
      <input className="note-input" type="password" aria-label="비밀번호" placeholder="비밀번호" autoComplete={signup ? 'new-password' : 'current-password'} value={password} onChange={e => { setPassword(e.target.value); setError(''); }} />
      {signup && <input className="note-input" aria-label="이름" placeholder="이름" maxLength={10} autoComplete="nickname" value={name} onChange={e => setName(e.target.value)} />}
      {signup && <div className="consent" role="group" aria-label="가입 동의">
        <div className="consent-row">
          <input id="signup-age" type="checkbox" checked={age} onChange={e => { setAge(e.target.checked); setError(''); }} />
          <label htmlFor="signup-age">[필수] 만 14세 이상입니다</label>
        </div>
        <div className="consent-row">
          <input id="signup-terms" type="checkbox" checked={terms} onChange={e => { setTerms(e.target.checked); setError(''); }} />
          <label htmlFor="signup-terms">[필수] 이용약관에 동의합니다</label>
          <button type="button" className="consent-link" onClick={() => setLegal('terms')}>보기</button>
        </div>
        <div className="consent-row">
          <input id="signup-privacy" type="checkbox" checked={privacy} onChange={e => { setPrivacy(e.target.checked); setError(''); }} />
          <label htmlFor="signup-privacy">[필수] 개인정보 수집·이용에 동의합니다</label>
          <button type="button" className="consent-link" onClick={() => setLegal('privacy')}>보기</button>
        </div>
      </div>}
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="btn-primary" disabled={!cleanHandle(handle) || !password || (signup && (!name.trim() || !agreed))}>{signup ? '가입' : '로그인'}</button>
    </form>
    {legal && <LegalSheet doc={legal} title={legal === 'terms' ? '이용약관' : '개인정보처리방침'} onClose={() => setLegal(null)} />}
  </>;
}
