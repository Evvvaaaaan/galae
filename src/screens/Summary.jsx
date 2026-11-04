import useGrow from '../useGrow.js';
import { Icon } from '../components/UI.jsx';

export default function Summary({ question, answer, groups, onOpen, onShare, onReading, onRetry }) {
  const grown = useGrow();
  const shared = groups.filter(g => answer.sharedWith.includes(g.id));
  return <div className="flow summary">
    <h1 className="question-body" tabIndex={-1}>{question.body}</h1>
    <div className="record">
      <strong>{question.choices.find(c => c.id === answer.sel)?.text}</strong>
      {answer.reason && <p className="preserve-lines">{answer.reason}</p>}
    </div>
    <div className="results">{question.choices.map((c, i) => <div key={c.id} className={c.id === answer.sel ? 'result mine' : 'result'}>
      <button className="row" onClick={() => onOpen(c.id)}><span>{c.short}</span><span className="pct"><strong>{c.pct}%</strong><Icon name="next" size={16} /></span></button>
      <div className="track"><div className="bar" style={{ width: grown ? `${c.pct}%` : 0, transitionDelay: `${i * 80}ms` }} /></div>
    </div>)}</div>
    {shared.length > 0 && <p className="shared">{shared.map(g => g.name).join(' · ')}</p>}
    <div className="actions">
      <button className="btn-primary" onClick={onReading}>확장하기 다시 확인</button>
      <div className="inline-actions">
        <button className="btn-text" onClick={onShare}>공유하기</button>
        <button className="btn-text" onClick={onRetry}>다시 하기</button>
      </div>
    </div>
  </div>;
}
