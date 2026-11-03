import { Avatar } from '../components/UI.jsx';
import { MEMBERS } from '../questionData.js';

// 결과 화면에서 고른 선택지의 댓글입니다. 위에는 질문 카드, 아래에는 그 선택지를 고른 사람들의 이유가 달립니다.
export default function Comments({ question, choice, comments, answer, profile }) {
  const me = { name: profile.name || '나', color: profile.color };
  const mine = answer.sel === choice.id && answer.reason;
  return <div className="flow">
    <article className="thread-card">
      <span className="hint">{question.category}</span>
      <h1 tabIndex={-1}>{question.title}</h1>
      <p>{question.body}</p>
      <div className="thread-choice"><span>{choice.text}</span><strong>{choice.pct}%</strong></div>
    </article>
    <ul className="comment-list">
      {mine && <li><Avatar {...me} /><div><span className="bubble-name">{me.name}</span><p className="preserve-lines">{answer.reason}</p></div></li>}
      {comments.map((item, i) => {
        const member = MEMBERS[i % MEMBERS.length];
        return <li key={item}><Avatar {...member} /><div><span className="bubble-name">{member.name}</span><p>{item}</p></div></li>;
      })}
    </ul>
  </div>;
}
