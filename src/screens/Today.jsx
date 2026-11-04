import { QUESTIONS, TODAY, MEMBERS, SAMPLE_SHARES, dateLabel } from '../questionData.js';
import { Avatar, Icon } from '../components/UI.jsx';
import { BranchMotif } from '../motifs.jsx';

export default function Today({ state, go, openQuestion }) {
  const answer = state.answers[TODAY.id];
  const groups = state.groups.filter(g => state.joined.includes(g.id));
  return <div className="today">
    <section className="today-card">
      <BranchMotif count={TODAY.choices.length} />
      <div className="today-card-body">
        <div className="row"><time dateTime={TODAY.date}>{dateLabel(TODAY.date)}</time></div>
        <h1 tabIndex={-1}>{TODAY.body}</h1>
        <div className="today-people">
          <span className="avatar-stack">{MEMBERS.slice(0, 3).map(m => <Avatar key={m.id} {...m} />)}</span>
          <span>{TODAY.participants.toLocaleString()}명 참여</span>
        </div>
        <button className="btn-primary" onClick={() => openQuestion(TODAY.id)}>오늘의 갈래 시작하기</button>
      </div>
    </section>
    <div className="list">{groups.length ? groups.slice(0, 2).map(group => {
      const sharers = SAMPLE_SHARES.filter(s => s.groupId === group.id && s.questionId === TODAY.id).map(s => MEMBERS.find(m => m.id === s.memberId));
      return <button className="list-row" key={group.id} onClick={() => go(`groups/${group.id}`)}>
        <Avatar name={group.name} color={group.color} />
        <span><strong>{group.name}</strong><small className="hint">오늘 {sharers.length + (answer?.sharedWith.includes(group.id) ? 1 : 0)}명이 나눴어요</small></span>
        <span className="avatar-stack">{sharers.map(m => <Avatar key={m.id} {...m} />)}</span>
      </button>;
    }) : <button className="list-row" onClick={() => go('groups/new')}><Icon name="groups" size={20} /><span>그룹 만들기</span></button>}</div>
    <div className="list past">{QUESTIONS.slice(1, 4).map(q => <button className="record-row" key={q.id} onClick={() => openQuestion(q.id)}>
      <time dateTime={q.date}>{dateLabel(q.date)}</time>
      <strong>{q.title}</strong>
      {state.answers[q.id]?.submitted && <span>{q.choices.find(c => c.id === state.answers[q.id].sel)?.short}</span>}
    </button>)}</div>
  </div>;
}
