import { useState } from 'react';
import { QUESTIONS, dateLabel } from '../questionData.js';
import { Icon, Empty } from '../components/UI.jsx';

const STATUS = ['전체', '미답변', '답변 완료'];
const CATEGORIES = ['전체 주제', ...new Set(QUESTIONS.map(q => q.category))];

export default function Archive({ answers, openQuestion }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(STATUS[0]);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const filtered = QUESTIONS.filter(q => (category === CATEGORIES[0] || category === q.category) && (status === STATUS[0] || (status === STATUS[2] ? answers[q.id]?.submitted : !answers[q.id]?.submitted)) && `${q.title} ${q.body}`.includes(query.trim()));
  return <>
    <h1 className="visually-hidden" tabIndex={-1}>질문</h1>
    <label className="search"><Icon name="search" size={18} /><input aria-label="검색" placeholder="검색" value={query} onChange={e => setQuery(e.target.value)} />{query && <button className="btn-text clear" aria-label="검색어 지우기" onClick={() => setQuery('')}>×</button>}</label>
    <div className="filters">
      <div className="tabs">{STATUS.map(s => <button key={s} aria-pressed={s === status} onClick={() => setStatus(s)}>{s}</button>)}</div>
      <select aria-label="주제" value={category} onChange={e => setCategory(e.target.value)}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select>
    </div>
    {filtered.length ? <div className="list">{filtered.map(q => {
      const answer = answers[q.id];
      return <button className="record-row" key={q.id} onClick={() => openQuestion(q.id)}>
        <div className="meta"><time dateTime={q.date}>{dateLabel(q.date)}</time><span>{q.category}</span><span>NO. {q.no}</span><span className={answer?.submitted ? 'status done' : 'status'}>{answer?.submitted ? '답변 완료' : '미답변'}</span></div>
        <strong>{q.title}</strong>
        <p className="record-note">{q.body}</p>
        {answer?.submitted && <span>{q.choices.find(c => c.id === answer.sel)?.short}</span>}
      </button>;
    })}</div>
      : <Empty title="조건에 맞는 질문이 없어요" label="필터 초기화" onClick={() => { setQuery(''); setStatus(STATUS[0]); setCategory(CATEGORIES[0]); }} />}
  </>;
}
