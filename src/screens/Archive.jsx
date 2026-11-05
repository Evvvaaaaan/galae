import { useState } from 'react';
import { choiceOf, dateLabel } from '../questionData.js';
import { Icon, Empty } from '../components/UI.jsx';

const STATUS = ['전체', '미답변', '답변 완료'];

export default function Archive({ questions: QUESTIONS, answers, openQuestion }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(STATUS[0]);
  const filtered = QUESTIONS.filter(q => (status === STATUS[0] || (status === STATUS[2] ? answers[q.id]?.submitted : !answers[q.id]?.submitted)) && `${q.title} ${q.body}`.includes(query.trim()));
  return <>
    <h1 className="visually-hidden" tabIndex={-1}>질문</h1>
    <label className="search"><Icon name="search" size={18} /><input aria-label="검색" placeholder="검색" value={query} onChange={e => setQuery(e.target.value)} />{query && <button className="btn-text clear" aria-label="검색어 지우기" onClick={() => setQuery('')}>×</button>}</label>
    <div className="filters">
      <div className="tabs">{STATUS.map(s => <button key={s} aria-pressed={s === status} onClick={() => setStatus(s)}>{s}</button>)}</div>
    </div>
    {filtered.length ? <div className="list">{filtered.map(q => <QuestionRow key={q.id} question={q} answer={answers[q.id]} onClick={() => openQuestion(q.id)} />)}</div>
      : <Empty title="조건에 맞는 질문이 없어요" label="필터 초기화" onClick={() => { setQuery(''); setStatus(STATUS[0]); }} />}
  </>;
}

export function QuestionRow({ question: q, answer, onClick }) {
  return <button className="record-row" onClick={onClick}>
    <div className="meta"><time dateTime={q.date}>{dateLabel(q.date)}</time></div>
    <strong>{q.title}</strong>
    <p className="record-note">{q.body}</p>
    {answer?.submitted && <span>{choiceOf(q, answer.sel)?.short}</span>}
  </button>;
}
