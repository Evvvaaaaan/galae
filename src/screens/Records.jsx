import { useState } from 'react';
import { QUESTIONS, TODAY, dateLabel } from '../questionData.js';
import PARADOXES from '../../content/paradoxes.json';
import { Avatar, Empty } from '../components/UI.jsx';
import { TOPICS } from './Feed.jsx';

const FILTERS = ['전체', '공유', '댓글'];
const [YEAR, MONTH, TODAY_DAY] = TODAY.date.split('-').map(Number);
const FIRST_WEEKDAY = new Date(YEAR, MONTH - 1, 1).getDay();
const DAYS = new Date(YEAR, MONTH, 0).getDate();

export default function Records({ answers, comments, profile, go, openQuestion }) {
  const [filter, setFilter] = useState(FILTERS[0]);
  const answered = QUESTIONS.filter(q => answers[q.id]?.submitted);
  const visible = answered.filter(q => filter === FILTERS[0] || answers[q.id].sharedWith.length);
  return <>
    <h1 className="visually-hidden" tabIndex={-1}>기록</h1>
    <div className="profile-row"><Avatar name={profile.name || '나'} color={profile.color} /><strong>{profile.name || '나'}</strong></div>
    <p className="records-summary"><strong>{answered.length}</strong>번의 선택</p>
    <div className="calendar" aria-label={`${YEAR}년 ${MONTH}월`}>
      {['일', '월', '화', '수', '목', '금', '토'].map(d => <span className="weekday" key={d}>{d}</span>)}
      {Array.from({ length: FIRST_WEEKDAY }, (_, i) => <span key={`blank${i}`} />)}
      {Array.from({ length: DAYS }, (_, i) => {
        const day = i + 1;
        const q = QUESTIONS.find(q => q.date === `${YEAR}-${String(MONTH).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
        const done = q && answers[q.id]?.submitted;
        return <button key={day} disabled={!q} aria-label={`${MONTH}월 ${day}일${q ? ` ${q.title}` : ''}`} className={`${done ? 'done' : ''} ${day === TODAY_DAY ? 'today' : ''}`} onClick={() => openQuestion(q.id)}>{day}</button>;
      })}
    </div>
    <button className="report-link" onClick={() => go('report')}>내 생각의 방향</button>
    <div className="filters"><div className="tabs">{FILTERS.map(f => <button key={f} aria-pressed={f === filter} onClick={() => setFilter(f)}>{f}</button>)}</div></div>
    {filter === FILTERS[2] ? comments.length ? <div className="list">{[...comments].reverse().map(c => {
      const topic = PARADOXES.find(p => p.id === c.topicId);
      return <button className="record-row" key={c.id} disabled={!TOPICS.some(t => t.id === c.topicId)} onClick={() => go(`feed/${c.topicId}`)}>
        <strong>{topic.title}</strong>
        <p className="record-note preserve-lines">{c.text}</p>
      </button>;
    })}</div> : <Empty title="아직 남긴 댓글이 없어요" label="생각 보러 가기" onClick={() => go('feed')} />
    : visible.length ? <div className="list">{visible.map(q => <button className="record-row" key={q.id} onClick={() => go(`records/${q.id}`)}>
      <div className="meta"><time dateTime={q.date}>{dateLabel(q.date)}</time><span>{q.category}</span><span>{answers[q.id].completed ? '완료' : '답변 완료'}</span></div>
      <strong>{q.title}</strong>
      <span>{q.choices.find(c => c.id === answers[q.id].sel)?.short}</span>
    </button>)}</div>
      : <Empty title={answered.length ? '아직 해당 기록이 없어요' : '첫 번째 갈래를 남겨보세요'} label="질문 만나보기" onClick={() => go('archive')} />}
  </>;
}
