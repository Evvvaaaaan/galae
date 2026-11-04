import { dateLabel } from '../questionData.js';

export default function RecordDetail({ question, answer, groups, go }) {
  const shared = groups.filter(g => answer.sharedWith.includes(g.id));
  return <div className="flow">
    <div className="meta"><time dateTime={question.date}>{dateLabel(question.date)}</time></div>
    <h1 className="question-body" tabIndex={-1}>{question.body}</h1>
    <div className="record">
      <strong>{question.choices.find(c => c.id === answer.sel)?.text}</strong>
      {answer.reason && <p className="preserve-lines">{answer.reason}</p>}
    </div>
    {shared.length > 0 && <p className="shared">{shared.map(g => g.name).join(' · ')}</p>}
    <div className="actions">
      <button className="btn-primary" onClick={() => go(`question/${question.id}/share`)}>나누기</button>
      <button className="btn-text" onClick={() => go(`question/${question.id}/result`)}>다시 보기</button>
    </div>
  </div>;
}
