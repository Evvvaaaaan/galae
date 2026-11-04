import { DoneMotif } from '../motifs.jsx';

export default function Done({ question, answer, go, group, onShareGroup }) {
  return <div className="flow done">
    <h1 className="flow-title" tabIndex={-1}>하나의 갈래를<br />지나왔어요</h1>
    <DoneMotif />
    <div className="record">
      <span className="hint">{question.title}</span>
      <strong>{question.choices.find(c => c.id === answer.sel)?.text}</strong>
    </div>
    {answer.sharedWith.length > 0 && <p className="shared">{answer.sharedWith.length}개 그룹에 공유 중</p>}
    <div className="actions">
      <button className="btn-primary" onClick={() => group ? onShareGroup() : go('share')}>나누기</button>
      <button className="btn-text" onClick={() => go('today')}>홈으로</button>
    </div>
  </div>;
}
