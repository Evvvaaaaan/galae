import { QUESTIONS } from '../questionData.js';
import { Empty } from '../components/UI.jsx';
import useGrow from '../useGrow.js';

const CATEGORIES = [...new Set(QUESTIONS.map(q => q.category))];

export default function Report({ answers, go }) {
  const grown = useGrow();
  const answered = QUESTIONS.filter(q => answers[q.id]?.submitted);
  if (!answered.length) return <><h1 className="visually-hidden" tabIndex={-1}>내 생각의 방향</h1><Empty title="아직 살펴볼 선택이 없어요" label="첫 질문 만나기" onClick={() => go('archive')} /></>;
  return <div className="flow">
    <h1 className="flow-title" tabIndex={-1}>{answered.length}개의 질문을<br />함께 생각했어요</h1>
    <div className="results">{CATEGORIES.map(category => {
      const count = answered.filter(q => q.category === category).length;
      return <div className="result" key={category}>
        <div className="row"><span>{category}</span><strong>{count}</strong></div>
        <div className="track"><div className="bar" style={{ width: grown ? `${count / answered.length * 100}%` : 0 }} /></div>
      </div>;
    })}</div>
  </div>;
}
