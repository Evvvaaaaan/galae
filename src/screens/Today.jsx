import { QUESTIONS, TODAY, SAMPLE_SHARES, dateLabel } from '../questionData.js';
import { Avatar, Icon } from '../components/UI.jsx';
import { BranchMotif } from '../motifs.jsx';

export default function Today({ state, go, openQuestion }) {
  const answer = state.answers[TODAY.id];
  const answered = QUESTIONS.filter(q => state.answers[q.id]?.submitted);
  const groups = state.groups.filter(g => state.joined.includes(g.id));
  return <div className="today">
    <div className="meta"><time dateTime={TODAY.date}>{dateLabel(TODAY.date)}</time></div>
    <section className="today-card">
      <BranchMotif count={TODAY.choices.length} />
      <div className="today-card-body">
        <div className="row"><span>오늘의 갈래 · {TODAY.no}</span><span>{TODAY.participants.toLocaleString()}명 참여</span></div>
        <h1 tabIndex={-1}>{TODAY.body}</h1>
      </div>
    </section>
    <button className="btn-primary" onClick={() => openQuestion(TODAY.id)}>{answer?.completed ? '내 답변 보기' : answer?.submitted ? '이어서 하기' : '답변하기'}</button>
    <button className="summary-strip" onClick={() => go('records')}>
      <span><strong>{answered.length}</strong>선택</span>
      <span><strong>{groups.length}</strong>그룹</span>
    </button>
    <div className="list">{groups.length ? groups.slice(0, 2).map(group => <button className="list-row" key={group.id} onClick={() => go(`groups/${group.id}`)}>
      <Avatar name={group.name} color={group.color} /><span>{group.name}</span>
      <small className="hint">{SAMPLE_SHARES.filter(s => s.groupId === group.id && s.questionId === TODAY.id).length + (answer?.sharedWith.includes(group.id) ? 1 : 0)}명 나눔</small>
    </button>) : <button className="list-row" onClick={() => go('groups/new')}><Icon name="groups" size={20} /><span>그룹 만들기</span></button>}</div>
    <div className="list">{QUESTIONS.slice(1, 3).map(q => <button className="record-row" key={q.id} onClick={() => openQuestion(q.id)}>
      <time dateTime={q.date}>{dateLabel(q.date)}</time>
      <strong>{q.title}</strong>
      {state.answers[q.id]?.submitted && <span>{q.choices.find(c => c.id === state.answers[q.id].sel)?.short}</span>}
    </button>)}</div>
  </div>;
}
