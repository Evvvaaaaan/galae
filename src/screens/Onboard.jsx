import { useRef, useState } from 'react';
import { OnboardMotif } from '../motifs.jsx';

const ONBOARD = [
  {
    title: "매일 하나의 질문이 주어집니다",
    sub: "하루에 하나, 질문이 찾아옵니다.\n질문에 답하여 나의 가치관과 생각을 정리해봐요.",
    cta: "다음",
  },
  {
    title: "먼저 답하고, 그다음 함께 봅니다",
    sub: "질문에 답하면 다른 사람들의 관점도 확인할 수 있어요.\n그룹 안에서 서로의 생각을 나눠보세요.",
    cta: "다음",
  },
  {
    title: "짧은 이야기로 시야를 넓혀요",
    sub: "생각 탭에는 여러 가지 흥미로운 이야기들이 기다리고 있어요.\n새로운 정보와 지식으로 더 깊은 생각을 시도해보세요.",
    cta: "다음",
  },
  {
    title: "답할수록 나만의 나무가 자라요",
    sub: "답을 하나 남길 때마다 나무에 가지가 하나씩 자라나요.\n나를 돌아보며 나무와 함께 성장해보세요.",
    cta: "시작하기",
  },
];

export default function Onboard({ go }) {
  const [step, setStep] = useState(0);
  const last = step === ONBOARD.length - 1;
  const cur = ONBOARD[step];
  // 화면을 좌우로 밀면 이전·다음 장으로 넘어갑니다. 마지막 장에서는 시작하기 버튼으로만 넘어갑니다.
  const swipe = useRef(null);
  const onPointerUp = e => {
    if (!swipe.current) return;
    const dx = e.clientX - swipe.current.x, dy = e.clientY - swipe.current.y;
    swipe.current = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0 && step > 0) setStep(step - 1);
    if (dx < 0 && !last) setStep(step + 1);
  };

  return (
    <div className="onboard-content" onPointerDown={e => { swipe.current = { x: e.clientX, y: e.clientY }; }} onPointerUp={onPointerUp} onPointerCancel={() => { swipe.current = null; }}>
      <div className="onboard-skip-row">
        <button type="button" className={`btn-text hint onboard-skip ${last ? 'is-hidden' : ''}`} onClick={() => go('today')}>
          건너뛰기
        </button>
      </div>
      <div className="onboard-body">
        <div className="onboard-motif"><OnboardMotif step={step} /></div>
        <div key={step}>
          <h1 tabIndex={-1}>{cur.title}</h1>
          <p className="sub">{cur.sub}</p>
        </div>
      </div>
      <div className="row">
        <div className="onboard-dots" aria-label={`${step + 1} / ${ONBOARD.length} 단계`}>
          {ONBOARD.map((_, i) => <span key={i} className={i === step ? 'on' : ''} />)}
        </div>
        <button type="button" className="btn-primary onboard-next" onClick={() => (last ? go('today') : setStep(step + 1))}>
          {cur.cta}
        </button>
      </div>
    </div>
  );
}
