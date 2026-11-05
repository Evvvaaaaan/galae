import { ResultBars } from './Result.jsx';
import { choiceOf } from '../questionData.js';

export default function Summary({ question, answer, groups, sent, onOpen, onShare, onReading, onRetry }) {
  const shared = groups.filter(g => sent.includes(g.id));
  return <div className="flow summary">
    <h1 className="question-body" tabIndex={-1}>{question.body}</h1>
    <div className="record">
      <strong>{choiceOf(question, answer.sel)?.text}</strong>
      {answer.reason && <p className="preserve-lines">{answer.reason}</p>}
    </div>
    <ResultBars question={question} sel={answer.sel} onOpen={onOpen} />
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
