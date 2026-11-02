import { useState } from 'react';
import { ONBOARD } from '../data.js';
import { OnboardMotif } from '../motifs.jsx';

export default function Onboard({ go }) {
  const [step, setStep] = useState(0);
  const last = step === ONBOARD.length - 1;
  const cur = ONBOARD[step];

  return (
    <div className="onboard-content">
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
