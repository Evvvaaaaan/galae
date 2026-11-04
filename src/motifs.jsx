// 갈래 모티프와 아이콘

function Path({ d, color, w }) {
  return <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" />;
}

function Drawn({ d, color, w, dur = 400, delay = 0 }) {
  return (
    <path
      d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="butt" pathLength={1}
      style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: `drawLine ${dur}ms ease-out ${delay}ms forwards` }}
    />
  );
}

export function SplashMotif() {
  return (
    <svg className="motif" viewBox="0 0 390 150" width="100%" height={150} preserveAspectRatio="none">
      <Path d="M0 92 C 80 92, 116 84, 163 66 C 217 44, 280 30, 390 26" color="#A9C8E4" w={1.1} />
      <Path d="M0 96 C 82 96, 121 92, 175 80 C 233 66, 301 56, 390 52" color="#C3D9EC" w={1.0} />
      <Path d="M0 100 C 84 100, 126 100, 187 96 C 261 90, 317 84, 390 80" color="#DCE7F0" w={0.9} />
      <Path d="M0 104 C 82 104, 116 110, 163 120 C 222 132, 292 140, 390 142" color="#C3D9EC" w={0.9} />
      <Path d="M0 108 C 77 108, 112 118, 149 130 C 199 145, 300 150, 390 150" color="#DCE7F0" w={0.8} />
    </svg>
  );
}

const TRUNK = 'M0 54 C 100 50, 200 47, 390 45';

export function OnboardMotif({ step }) {
  if (step === 3) return <SeedTree />;
  if (step === 2) {
    return (
      <div className="card-flip" aria-hidden="true">
        {/* 2단계의 세 갈래가 왼쪽에서 들어와 카드 뒤를 지나갑니다. */}
        <svg viewBox="0 0 390 150" width="100%" height={150} preserveAspectRatio="none">
          <Drawn d="M0 41 C 120 41, 250 60, 390 62" color="#A9C8E4" w={1.4} dur={700} />
          <Drawn d="M0 70 C 120 70, 250 75, 390 75" color="#A9C8E4" w={1.6} dur={700} delay={60} />
          <Drawn d="M0 109 C 120 109, 250 90, 390 88" color="#A9C8E4" w={1.3} dur={700} delay={120} />
        </svg>
        <div className="card-flip-track">
          {[0, 1, 2, 3].map(i => <span key={i} className="card-flip-card"><i /><i /></span>)}
        </div>
      </div>
    );
  }
  if (step === 0) {
    return (
      <svg className="motif" viewBox="0 0 390 100" width="100%" height={100} preserveAspectRatio="none">
        <Drawn d={TRUNK} color="#A9C8E4" w={2.4} />
      </svg>
    );
  }
  return (
    <svg className="motif" viewBox="0 0 390 100" width="100%" height={100} preserveAspectRatio="none">
      <defs>
        <linearGradient id="brUp" gradientUnits="userSpaceOnUse" x1={178} y1={0} x2={390} y2={0}>
          <stop offset={0} stopColor="#A9C8E4" stopOpacity={1} />
          <stop offset={0.45} stopColor="#A9C8E4" stopOpacity={0.62} />
          <stop offset={1} stopColor="#A9C8E4" stopOpacity={0.18} />
        </linearGradient>
        <linearGradient id="brDn" gradientUnits="userSpaceOnUse" x1={150} y1={0} x2={390} y2={0}>
          <stop offset={0} stopColor="#A9C8E4" stopOpacity={1} />
          <stop offset={0.45} stopColor="#A9C8E4" stopOpacity={0.55} />
          <stop offset={1} stopColor="#A9C8E4" stopOpacity={0.14} />
        </linearGradient>
      </defs>
      <Drawn d="M178 48.3 C 228 47.2, 264 36, 390 16" color="url(#brUp)" w={1.5} dur={320} delay={220} />
      <Drawn d="M150 48.6 C 212 49.6, 256 62, 390 84" color="url(#brDn)" w={1.3} dur={320} delay={300} />
      <path d={TRUNK} fill="none" stroke="#A9C8E4" strokeWidth={2.4} />
    </svg>
  );
}

// 답변 하나가 뿌리에서 가지 끝까지 이어지는 선 한 가닥이 되어 부채꼴 나무를 이룹니다.
// 첫 선은 가운데, 그다음은 왼쪽·오른쪽을 번갈아 빈 곳을 메웁니다. 업적 하나마다 고리 열매가 맺힙니다.
// 열매도 맺힌 순서대로 왼쪽·오른쪽을 번갈아, 그 방향에 가장 가까운 가지 끝에 답니다.
const TREE = { cx: 172, ground: 214, fanY: 146 };

function rng(seed) {
  let a = seed >>> 0;
  return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
const vdc = k => { let v = 0, b = 0.5; while (k) { if (k & 1) v += b; k >>= 1; b /= 2; } return v; };
const rad = d => d * Math.PI / 180;
const f = n => n.toFixed(1);

const spread = i => i === 0 ? 0 : (i % 2 ? -1 : 1) * (1 - vdc(Math.ceil(i / 2)));

function thread(i) {
  const { cx, ground, fanY } = TREE;
  const r = rng(i * 9973 + 17);
  const norm = Math.max(-1, Math.min(1, spread(i) + (r() - 0.5) * 0.04));
  const a = rad(-90 + norm * 82);
  const R = 118 + r() * 26 - Math.abs(norm) * 8;
  const bend = rad((r() - 0.5) * 14);
  const ra = rad(18 + r() * 144);
  const rr = 22 + r() * 22;
  const p0 = [cx + Math.cos(ra) * rr * 2.6, ground + Math.sin(ra) * rr];
  const p1 = [cx + norm * 7, ground - 4];
  const p2 = [cx + norm * 5, fanY + (r() - 0.5) * 6];
  const p3 = [cx + Math.cos(a - bend) * R * 0.55, fanY + Math.sin(a - bend) * R * 0.55];
  const tip = [cx + Math.cos(a) * R, fanY + Math.sin(a) * R];
  let d = `M${f(p0[0])} ${f(p0[1])} C ${f(p0[0] * 0.4 + p1[0] * 0.6)} ${f(p0[1] - 4)}, ${f(p1[0])} ${f(p1[1] + 12)}, ${f(p1[0])} ${f(p1[1])}`;
  d += ` C ${f(p1[0])} ${f(p1[1] - 26)}, ${f(p2[0])} ${f(p2[1] + 22)}, ${f(p2[0])} ${f(p2[1])}`;
  d += ` C ${f(p2[0])} ${f(p2[1] - 22)}, ${f(p3[0] - Math.cos(a) * 22)} ${f(p3[1] - Math.sin(a) * 22)}, ${f(p3[0])} ${f(p3[1])}`;
  d += ` Q ${f(cx + Math.cos(a) * R * 0.8)} ${f(fanY + Math.sin(a) * R * 0.8)}, ${f(tip[0])} ${f(tip[1])}`;
  const twigs = Array.from({ length: 1 + Math.floor(r() * 2) }, () => {
    const t0 = 0.62 + r() * 0.3;
    const bx = cx + Math.cos(a) * R * t0, by = fanY + Math.sin(a) * R * t0;
    const a3 = a + rad((r() < 0.5 ? -1 : 1) * (14 + r() * 16));
    const d3 = 14 + r() * 18;
    return `M${f(bx)} ${f(by)} Q ${f(bx + Math.cos(a3) * d3 * 0.5)} ${f(by + Math.sin(a3) * d3 * 0.5)}, ${f(bx + Math.cos(a3) * d3)} ${f(by + Math.sin(a3) * d3)}`;
  });
  return { d, twigs, tip, a, norm };
}

// 선보다 열매가 많으면 남는 열매는 선이 더 생길 때까지 달지 않습니다.
function fruitThreads(fruits, count) {
  const used = new Set();
  return Array.from({ length: Math.min(fruits, count) }, (_, k) => {
    const want = spread(k + 1);
    let best = -1;
    for (let i = 0; i < count; i++) if (!used.has(i) && (best < 0 || Math.abs(spread(i) - want) < Math.abs(spread(best) - want))) best = i;
    used.add(best);
    return best;
  });
}

// 온보딩 마지막 장: 선이 한 가닥씩 뿌리부터 자라 나무가 되고, 끝에 열매 하나가 맺힙니다.
const SEED_COUNT = 14;
const SEED_GAP = 160;
const SEED_IN = 1100;

// 앞 장의 세 갈래 선이 왼쪽에서 들어와 줄기 밑동으로 모인 뒤, 나무의 첫 세 가닥으로 자랍니다.
function incoming(i) {
  const t = thread(i);
  const parts = t.d.split(' C ');
  const [x1, y1] = parts[1].split(', ')[2].split(' ').map(Number);
  const y0 = [176, 192, 206][i];
  return { ...t, d: `M0 ${y0} C 70 ${y0}, ${f(x1 - 40)} ${f(y1 + 6)}, ${f(x1)} ${f(y1)} C ${parts.slice(2).join(' C ')}` };
}

function SeedTree() {
  const { tip, a } = thread(1);
  const fruit = { cx: f(tip[0] + Math.cos(a) * 3.6), cy: f(tip[1] + Math.sin(a) * 3.6), r: 3.6, fill: 'none' };
  const end = SEED_IN + SEED_GAP * (SEED_COUNT - 3) + 900;
  return (
    <svg className="seed-tree" viewBox="0 10 344 230" width="100%" aria-hidden="true">
      <path d={`M20 ${TREE.ground} C 110 ${TREE.ground - 3}, 234 ${TREE.ground - 3}, 324 ${TREE.ground}`} stroke="#E4EEF6" strokeWidth={1} fill="none" />
      <g fill="none" stroke="#6FA3CF" strokeOpacity={0.42} strokeLinecap="round">
        {Array.from({ length: SEED_COUNT }, (_, i) => {
          const { d, twigs } = i < 3 ? incoming(i) : thread(i);
          const delay = i < 3 ? i * 80 : SEED_IN + (i - 3) * SEED_GAP;
          return <g key={i}>
            <path d={d} pathLength={1} strokeWidth={1.1} style={{ animationDelay: `${delay}ms` }} />
            {twigs.map((t, k) => <path key={k} d={t} pathLength={1} strokeWidth={0.9} className="twig" style={{ animationDelay: `${delay + (i < 3 ? 1500 : 700)}ms` }} />)}
          </g>;
        })}
      </g>
      <circle {...fruit} className="seed-ripple" stroke="#2F6E9E" strokeWidth={0.5} style={{ animationDelay: `${end + 150}ms` }} />
      <circle {...fruit} className="seed-fruit" stroke="#8EC3EE" strokeOpacity={0.8} strokeWidth={0.9} style={{ animationDelay: `${end}ms` }} />
    </svg>
  );
}

const TREE_COLORS = { line: '#6FA3CF', op: 0.42, newest: '#2F6E9E', blur: 1.2, ground: '#E4EEF6', fruit: '#8EC3EE' };

// 새로 맺힌 열매가 여럿이면 이 간격으로 하나씩 맺히고, 이름도 하나씩 차례로 떠올랐다 사라집니다.
const FRUIT_GAP = 3200;

// fruits: 맺힌 순서대로 [{ id, name, desc, fresh }]. fresh는 아직 홈에서 맺히는 모습을 보지 못한 열매입니다.
// 새 선이 그려지면 선이 다 그려진 뒤에, 아니면 홈에 오자마자 맺힙니다.
export function WorldTree({ count, fruits = [], grow = false }) {
  const T = TREE_COLORS;
  const w = Math.max(0.55, 1.1 - count / 400);
  const fresh = fruits.filter(x => x.fresh);
  const at = x => (grow ? 3000 : 600) + fresh.indexOf(x) * FRUIT_GAP;
  // 이름이 떠 있는 동안(첫 이름이 떠오를 때부터 마지막 이름이 사라질 때까지) 나무를 잠깐 흐리게 해 새 열매에 시선을 모읍니다.
  const dim = fresh.length ? { animationDelay: `${at(fresh[0])}ms`, animationDuration: `${(fresh.length - 1) * FRUIT_GAP + 3600}ms` } : undefined;
  const placed = fruitThreads(fruits.length, count).map((ti, k) => {
    const { tip, a } = thread(ti);
    // 고리 가장자리가 가지 끝에 닿도록 반지름만큼 밀어 둡니다.
    const c = { cx: f(tip[0] + Math.cos(a) * 3.6), cy: f(tip[1] + Math.sin(a) * 3.6), r: 3.6, fill: 'none' };
    return { fruit: fruits[k], c, ring: { ...c, stroke: T.fruit, strokeOpacity: 0.6, strokeWidth: 0.8 } };
  });
  return (
    <div className="world-tree" style={{ '--newest': T.newest }}>
    <svg viewBox="0 0 344 260" width="100%" aria-hidden="true">
      <defs>
        <filter id="treeGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={T.blur} result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="treeHalo" cx="50%" cy="45%" r="50%">
          <stop offset={0} stopColor={T.line} stopOpacity={Math.min(0.22, count / 600)} />
          <stop offset={0.55} stopColor={T.line} stopOpacity={Math.min(0.22, count / 600) * 0.4} />
          <stop offset={1} stopColor={T.line} stopOpacity={0} />
        </radialGradient>
      </defs>
      <g className={dim && 'tree-dim'} style={dim}>
      {/* 카드 안쪽에서 완전히 사라지도록, 잘리는 가장자리(위·양옆)보다 작게 둡니다. */}
      <ellipse cx={TREE.cx} cy={TREE.fanY - 26} rx={136} ry={108} fill="url(#treeHalo)" />
      <path d={`M20 ${TREE.ground} C 110 ${TREE.ground - 3}, 234 ${TREE.ground - 3}, 324 ${TREE.ground}`} stroke={T.ground} strokeWidth={1} fill="none" />
      <g filter="url(#treeGlow)" fill="none" strokeLinecap="round">
        {Array.from({ length: count }, (_, i) => {
          const { d, twigs } = thread(i);
          const last = i === count - 1;
          return <g key={i} stroke={T.line} className={last && grow ? 'grow' : undefined}>
            <path d={d} pathLength={1} strokeOpacity={T.op} strokeWidth={w} />
            {twigs.map((t, k) => <path key={k} d={t} pathLength={1} strokeOpacity={T.op * 0.8} strokeWidth={w * 0.8} />)}
          </g>;
        })}
      </g>
      {placed.filter(p => !p.fruit.fresh).map(p => <circle key={p.fruit.id} {...p.ring} />)}
      </g>
      {placed.filter(p => p.fruit.fresh).map(({ fruit, c, ring }) => {
        // 새 열매는 남색으로 피어나며 물결이 한 번 번지고, 이름이 사라질 즈음 파란색으로 돌아갑니다.
        const t = at(fruit);
        return <g key={fruit.id}>
          <circle {...c} className="fruit-ripple" stroke={T.newest} strokeWidth={0.5} style={{ animationDelay: `${t + 150}ms` }} />
          <circle {...ring} className="new-fruit" style={{ animationDelay: `${t}ms, ${t + 2400}ms` }} />
        </g>;
      })}
    </svg>
    {fresh.length > 0 && <div className="fruit-caption" aria-live="polite">{fresh.map(x =>
      <p key={x.id} style={{ animationDelay: `${at(x) + 300}ms` }}><strong>{x.name}</strong><span className="fruit-rule" />{x.desc}</p>)}</div>}
    </div>
  );
}
