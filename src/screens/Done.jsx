import { choiceOf } from '../questionData.js';

export default function Done({ question, answer, sent, go, onShare }) {
  return <div className="flow done">
    <h1 className="question-body" tabIndex={-1}>{question.body}</h1>
    <div className="record">
      <strong>{choiceOf(question, answer.sel)?.text}</strong>
    </div>
    {sent.length > 0 && <p className="shared">{sent.length}개 그룹에 공유 중</p>}
    <div className="actions">
      <button className="btn-primary" onClick={onShare}>공유하기</button>
      <button className="btn-text" onClick={() => go('today')}>홈으로</button>
    </div>
  </div>;
}
