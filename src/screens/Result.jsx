import useGrow from '../useGrow.js';
import { Icon } from '../components/UI.jsx';

export default function Result({ question, sel, onOpen, next }) {
  const grown = useGrow();
  return <div className="flow">
    <h1 className="flow-title" tabIndex={-1}>같은 질문,<br />서로 다른 갈래</h1>
    <p className="sub">{question.title}</p>
    <div className="results">{question.choices.map((c, i) => <div key={c.id} className={c.id === sel ? 'result mine' : 'result'}>
      <button className="row" onClick={() => onOpen(c.id)}><span>{c.short}</span><span className="pct"><strong>{c.pct}%</strong><Icon name="next" size={16} /></span></button>
      <div className="track"><div className="bar" style={{ width: grown ? `${c.pct}%` : 0, transitionDelay: `${i * 80}ms` }} /></div>
    </div>)}</div>
    <p className="hint">{question.participants.toLocaleString()}명</p>
    <div className="cta-bar"><button className="btn-primary" onClick={next}>다음</button></div>
  </div>;
}
