import { LOGINS } from '../data.js';
import { BrandIcon, SplashMotif } from '../motifs.jsx';

export default function Login({ go }) {
  return <div className="start">
    <SplashMotif />
    <div className="start-title">
      <h1 tabIndex={-1}>갈래</h1>
      <p>하나의 질문, 여러 갈래의 생각</p>
    </div>
    <div className="start-actions">
      <button className="btn-primary" onClick={() => go('onboard')}>시작하기</button>
      {LOGINS.map(l => <button key={l.icon} className="btn-login" disabled><BrandIcon kind={l.icon} />{l.label}</button>)}
    </div>
  </div>;
}
