import { Icon } from '../components/UI.jsx';

export default function Question({ question, answer, onPick, onReason, onSubmit }) {
  return <div className="flow">
    <div className="meta"><span>{question.category}</span><span>NO. {question.no}</span></div>
    <h1 className="question-body" tabIndex={-1}>{question.body}</h1>
    <div className="choices">{question.choices.map((c, i) => <button key={c.id} className={`choice ${answer.sel === c.id ? 'on' : ''}`} disabled={answer.submitted} aria-pressed={answer.sel === c.id} onClick={() => onPick(c.id)}><span className="letter">{String.fromCharCode(65 + i)}</span><span>{c.text}</span>{answer.sel === c.id && <Icon name="check" size={18} />}</button>)}</div>
    {(!answer.submitted || answer.reason) && <div className="field">
      <textarea className="note-input" aria-label="선택한 이유" rows={3} maxLength={500} placeholder="이유" value={answer.reason} readOnly={answer.submitted} onChange={e => onReason(e.target.value)} />
      {!answer.submitted && <span className="count">{answer.reason.length}/500</span>}
    </div>}
    <button className="btn-primary" disabled={answer.sel === null} onClick={onSubmit}>{answer.submitted ? '다음' : '선택하기'}</button>
  </div>;
}
