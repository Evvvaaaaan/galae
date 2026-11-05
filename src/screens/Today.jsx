import { useEffect, useState } from 'react';
import { dateLabel } from '../questionData.js';
import { joinedGroups } from '../store.js';
import { Avatar, Icon } from '../components/UI.jsx';
import { WorldTree } from '../motifs.jsx';
import { addDays, answeredDays, earnedList } from '../achievements.js';

const SEEN_KEY = 'galae.treeSeen';
const readSeen = key => { try { return Number(localStorage.getItem(key)) || 0; } catch { return 0; } };
// 홈에서 맺히는 모습을 이미 본 열매입니다. 처음이면 지금 있는 열매를 모두 본 것으로 둡니다.
const FRUIT_KEY = 'galae.fruitSeen';
const readFruits = key => { try { const v = JSON.parse(localStorage.getItem(key)); return Array.isArray(v) ? v : null; } catch { return null; } };

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

// 답한 날을 갈래 선으로 이어 이번 주를 보여 줍니다. 하루 빠지면 연속 일수는 다시 셉니다.
const STREAK_COLORS = { on: '#A9C8E4', off: '#DCE7F0', bg: '#FDFDFC', key: '#2B4A63' };

function Streak({ answers, today, streak }) {
  const c = STREAK_COLORS;
  const answered = answeredDays(answers);
  const dow = (new Date(Date.parse(today)).getUTCDay() + 6) % 7;
  const week = DAYS.map((_, i) => addDays(today, i - dow));
  const x = i => 14 + i * 316 / 6;
  return <section className="today-box today-streak">
    <p className="streak"><b>{streak}</b>일째</p>
    <svg viewBox="0 0 344 54" width="100%" aria-hidden="true">
      <path d={`M${x(0)} 20 L${x(dow)} 20`} stroke={c.on} strokeWidth={2.2} />
      <path d={`M${x(dow)} 20 L${x(6)} 20`} stroke={c.off} strokeWidth={1.4} strokeDasharray="3 4" />
      {week.map((d, i) => i === dow && !answered.has(d)
        ? <circle key={d} cx={x(i)} cy={20} r={6} fill={c.bg} stroke={c.key} strokeWidth={1.5} />
        : <circle key={d} cx={x(i)} cy={20} r={answered.has(d) ? 5 : 3.5} fill={answered.has(d) ? c.on : c.off} />)}
      {DAYS.map((name, i) => <text key={name} x={x(i)} y={46} textAnchor="middle">{name}</text>)}
    </svg>
  </section>;
}

export default function Today({ state, go, openQuestion }) {
  const TODAY = state.today;
  const seenKey = `${SEEN_KEY}:${state.profile.id}`;
  const fruitKey = `${FRUIT_KEY}:${state.profile.id}`;
  const answer = state.answers[TODAY?.id];
  const groups = joinedGroups(state);
  const answeredCount = state.profile.answers;
  // 답한 뒤 홈에 처음 돌아왔을 때만 새 선을 그립니다.
  const [grow] = useState(() => answeredCount > readSeen(seenKey));
  const achievedIds = Object.keys(state.achieved);
  const [seenFruits] = useState(() => readFruits(fruitKey) ?? achievedIds);
  useEffect(() => { try { localStorage.setItem(fruitKey, JSON.stringify(achievedIds)); } catch { /* 저장할 수 없는 환경입니다. */ } }, [achievedIds.join()]);
  const fruits = earnedList(state.achieved).map(a => ({ ...a, fresh: !seenFruits.includes(a.id) }));
  useEffect(() => { try { localStorage.setItem(seenKey, String(answeredCount)); } catch { /* 저장할 수 없는 환경입니다. */ } }, [answeredCount]);
  return <div className="today">
    <WorldTree count={answeredCount} fruits={fruits} grow={grow} />
    <Streak answers={state.answers} today={state.todayDate} streak={state.profile.streak} />
    {TODAY ? <section className="today-card">
      <div className="today-card-body">
        <div className="row"><time dateTime={TODAY.date}>{dateLabel(TODAY.date)}</time></div>
        <h1 tabIndex={-1}>{TODAY.body}</h1>
        <div className="today-people">
          <span>{TODAY.participants.toLocaleString()}명이 참여했습니다</span>
        </div>
        <button className="btn-primary" onClick={() => openQuestion(TODAY.id)}>{answer?.completed ? '갈래 다시 보기' : answer?.submitted ? '갈래 이어가기' : TODAY.date === state.todayDate ? '오늘의 갈래 시작하기' : '최근 갈래 시작하기'}</button>
      </div>
    </section> : <p className="empty">아직 공개된 갈래가 없어요</p>}
    <div className="list today-box">{groups.length ? groups.slice(0, 2).map(group => {
      const sharers = group.todaySharedMembers || [];
      return <button className="list-row" key={group.id} onClick={() => go(`groups/${group.id}`)}>
        <Avatar name={group.name} color={group.color} photo={group.photo} />
        <span><strong>{group.name}</strong>{group.description && <small className="hint">{group.description}</small>}</span>
        <span className="avatar-stack">{sharers.map(m => <Avatar key={m.id} {...m} />)}</span>
      </button>;
    }) : <button className="list-row" onClick={() => go('groups/new')}><Icon name="groups" size={20} /><span>그룹 만들기</span></button>}</div>
  </div>;
}
