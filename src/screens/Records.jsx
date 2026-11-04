import { useState } from 'react';
import { QUESTIONS, TODAY } from '../questionData.js';
import PARADOXES from '../../content/paradoxes.json';
import { Avatar, Empty, Icon } from '../components/UI.jsx';
import { TOPICS } from './Feed.jsx';
import { currentStreak } from './Today.jsx';
import { QuestionRow } from './Archive.jsx';
import { ACHIEVEMENTS } from '../achievements.js';
import { WorldTree } from '../motifs.jsx';

const [TODAY_YEAR, TODAY_MONTH, TODAY_DAY] = TODAY.date.split('-').map(Number);

export default function Records({ answers, achieved, comments, profile, joinedOn, go }) {
  const answered = QUESTIONS.filter(q => answers[q.id]?.submitted);
  // 오늘이 있는 달에서 몇 달 떨어진 달을 보고 있는지입니다.
  const [offset, setOffset] = useState(0);
  // 달력 아래에 기록을 보여줄 날. 처음에는 오늘입니다.
  const [selected, setSelected] = useState(TODAY.date);
  const first = new Date(TODAY_YEAR, TODAY_MONTH - 1 + offset, 1);
  const year = first.getFullYear();
  const month = first.getMonth() + 1;
  const days = new Date(year, month, 0).getDate();
  const isTodayMonth = year === TODAY_YEAR && month === TODAY_MONTH;
  // const earned = Object.entries(achieved).map(([id, a]) => ({ ...ACHIEVEMENTS.find(x => x.id === id), on: a.on }));
  const earned = ACHIEVEMENTS.map(a => ({ ...a, on: '2026-11-05' }));
  return <>
    <h1 className="visually-hidden" tabIndex={-1}>나</h1>
    <div className="profile">
      <Avatar name={profile.name || '나'} color={profile.color} photo={profile.photo} />
      <div>
        <strong>{profile.name || '나'}</strong>
        <ul className="profile-stats">
          <li><strong>{answered.length}</strong>선택</li>
          <li><strong>{currentStreak(answers, TODAY.date)}</strong>연속</li>
          <li><button onClick={() => go('records/comments')}><strong>{comments.length}</strong>댓글</button></li>
        </ul>
      </div>
    </div>
    {profile.bio && <p className="profile-bio">{profile.bio}</p>}
    <button className="btn-secondary profile-edit" onClick={() => go('settings/profile')}>프로필 편집</button>
    <Fruits earned={earned} />
    <div className="calendar-month">
      <p aria-live="polite">{year}년 {month}월</p>
      <div>
        <button className="icon-button" aria-label="이전 달" onClick={() => setOffset(o => o - 1)}><Icon name="back" size={20} /></button>
        <button className="icon-button" aria-label="다음 달" onClick={() => setOffset(o => o + 1)}><Icon name="next" size={20} /></button>
      </div>
    </div>
    <div className="calendar">
      {['일', '월', '화', '수', '목', '금', '토'].map(d => <span className="weekday" key={d}>{d}</span>)}
      {Array.from({ length: first.getDay() }, (_, i) => <span key={`blank${i}`} />)}
      {Array.from({ length: days }, (_, i) => {
        const day = i + 1;
        const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        // 가입한 날부터 오늘까지만 답할 수 있습니다.
        const open = date >= joinedOn && date <= TODAY.date;
        const done = Object.values(answers).some(a => a.answeredOn === date);
        return <button key={day} disabled={!open} aria-label={`${month}월 ${day}일`} aria-current={isTodayMonth && day === TODAY_DAY ? 'date' : undefined} aria-pressed={open ? date === selected : undefined} className={done ? 'done' : undefined} onClick={() => setSelected(date)}>{day}</button>;
      })}
    </div>
    <div className="day-records"><DayRecords date={selected} answers={answers} go={go} /></div>
  </>;
}

// 맺은 열매만 맺은 순서대로 고리로 늘어놓습니다. 고리를 누르면 이름, 날짜, 설명 한 줄을 보여 줍니다.
function Fruits({ earned }) {
  const [open, setOpen] = useState(null);
  if (!earned.length) return null;
  const shown = earned.find(a => a.id === open);
  return <div className="fruits">
    <div className="fruit-row">{earned.map(a => <button key={a.id} aria-label={a.name} aria-pressed={a.id === open} onClick={() => setOpen(o => o === a.id ? null : a.id)}>
      <svg viewBox="0 0 20 20" width={28} height={28} aria-hidden="true"><circle cx={10} cy={10} r={7} fill="none" /></svg>
    </button>)}</div>
    {shown && <p className="fruit-note" aria-live="polite"><strong>{shown.name}</strong>{Number(shown.on.slice(5, 7))}월 {Number(shown.on.slice(8, 10))}일 · {shown.desc}</p>}
  </div>;
}

// 다른 사람의 프로필입니다. 이름·소개·열매 아래에 그 사람의 나무가 있습니다.
export function MemberProfile({ member }) {
  const earned = Object.entries(member.achieved).map(([id, a]) => ({ ...ACHIEVEMENTS.find(x => x.id === id), on: a.on }));
  return <>
    <div className="profile member">
      <Avatar {...member} />
      <div>
        <strong>{member.name}</strong>
        <ul className="profile-stats">
          <li><strong>{member.answers}</strong>선택</li>
          <li><strong>{member.streak}</strong>연속</li>
          <li><strong>{member.comments}</strong>댓글</li>
        </ul>
      </div>
    </div>
    {member.bio && <p className="profile-bio">{member.bio}</p>}
    <Fruits earned={earned} />
    <WorldTree count={member.answers} fruits={earned} />
  </>;
}

function DayRecords({ date, answers, go }) {
  const answered = QUESTIONS.filter(q => answers[q.id]?.answeredOn === date);
  if (!answered.length) return <Empty title="답변한 갈래가 없습니다." label="답변하러 가기" onClick={() => go('archive')} />;
  return <div className="list">{answered.map(q => <QuestionRow key={q.id} question={q} answer={answers[q.id]} onClick={() => go(`records/${q.id}`)} />)}</div>;
}

export function MyComments({ comments, go }) {
  if (!comments.length) return <Empty title="아직 남긴 댓글이 없어요" label="생각 보러 가기" onClick={() => go('feed')} />;
  return <div className="list">{[...comments].reverse().map(c => {
    const topic = PARADOXES.find(p => p.id === c.topicId);
    return <button className="record-row" key={c.id} disabled={!TOPICS.some(t => t.id === c.topicId)} onClick={() => go(`feed/${c.topicId}`)}>
      <strong>{topic.title}</strong>
      <p className="record-note preserve-lines">{c.text}</p>
    </button>;
  })}</div>;
}
