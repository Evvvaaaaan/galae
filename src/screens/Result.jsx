import { useEffect, useState } from 'react';
import { Icon } from '../components/UI.jsx';

// 화면 진입 직후 막대가 0에서 차오르도록 한 틱 늦게 true가 된다
function useGrow() {
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGrown(true), 60);
    return () => clearTimeout(t);
  }, []);
  return grown;
}

export default function Result({ question, sel, onOpen, next }) {
  return <div className="flow">
    <h1 className="flow-title" tabIndex={-1}>같은 질문,<br />서로 다른 갈래</h1>
    <p className="sub">{question.title}</p>
    <ResultBars question={question} sel={sel} onOpen={onOpen} />
    <p className="hint">{question.participants.toLocaleString()}명</p>
    <div className="cta-bar"><button className="btn-primary" onClick={next}>다음</button></div>
  </div>;
}

export function ResultBars({ question, sel, onOpen }) {
  const grown = useGrow();
  return <div className="results">{question.choices.map((c, i) => <div key={c.id} className={c.id === sel ? 'result mine' : 'result'}>
    <button className="row" onClick={() => onOpen(c.id)}><span>{c.short}</span><span className="pct"><strong>{c.pct}%</strong><Icon name="next" size={16} /></span></button>
    <div className="track"><div className="bar" style={{ width: grown ? `${c.pct}%` : 0, transitionDelay: `${i * 80}ms` }} /></div>
  </div>)}</div>;
}
