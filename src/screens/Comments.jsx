import { Avatar } from '../components/UI.jsx';
import { myself } from '../store.js';

// 결과 화면에서 고른 선택지의 댓글입니다. 위에는 질문 카드, 아래에는 그 선택지를 고른 사람들의 이유가 달립니다.
export default function Comments({ question, choice, comments, answer, profile, page, onMore }) {
  const me = myself(profile);
  const mine = answer.sel === choice.id && answer.reason;
  return <div className="flow">
    <article className="thread-card">
      <h1 tabIndex={-1}>{question.title}</h1>
      <p>{question.body}</p>
      <div className="thread-choice"><span>{choice.text}</span><strong>{choice.pct}%</strong></div>
    </article>
    <ul className="comment-list">
      {mine && <li><Avatar {...me} /><div><span className="bubble-name">{me.name}</span><p className="preserve-lines">{answer.reason}</p></div></li>}
      {comments.map((item, i) => {
        return <li key={`${i}-${item}`}><Avatar name="익명" /><div><span className="bubble-name">익명</span><p className="preserve-lines">{item}</p></div></li>;
      })}
    </ul>
    {page?.hasNext && <button className="btn-text" onClick={onMore}>더 보기</button>}
  </div>;
}
