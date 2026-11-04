import { SplashMotif } from '../motifs.jsx';

export default function Login({ go }) {
  return <div className="start">
    <SplashMotif />
    <div className="start-title">
      <h1 tabIndex={-1}>갈래</h1>
      <p>하나의 질문, 여러 갈래의 생각</p>
    </div>
    <div className="start-actions">
      <button className="btn-primary" onClick={() => go('signup')}>시작하기</button>
      <button className="btn-text" onClick={() => go('signin')}>로그인</button>
    </div>
  </div>;
}
