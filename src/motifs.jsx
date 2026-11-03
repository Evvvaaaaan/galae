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

// 한 줄기가 선택지 수만큼 갈라져 카드 끝까지 이어집니다. 스플래시의 파란 선 색으로 옅어집니다.
export function BranchMotif({ count }) {
  const ends = Array.from({ length: count }, (_, i) => count === 1 ? 86 : 30 + (112 * i) / (count - 1));
  return (
    <div className="branch">
      <svg className="motif" viewBox="0 0 344 168" width="100%" height={168} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="homeBranch" gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={344} y2={0}>
            <stop offset={0} stopColor="#A9C8E4" />
            <stop offset={0.37} stopColor="#A9C8E4" />
            <stop offset={1} stopColor="#DCE7F0" />
          </linearGradient>
        </defs>
        <path d="M0 88 C 50 87, 96 86, 128 86" fill="none" stroke="url(#homeBranch)" strokeWidth={2.2} />
        {ends.map((y, i) => <Drawn key={i} d={`M128 86 C 196 86, 236 ${y}, 344 ${y}`} color="url(#homeBranch)" w={1.4} dur={420} delay={120 + i * 80} />)}
      </svg>
    </div>
  );
}

export function DoneMotif() {
  return (
    <svg className="motif" viewBox="0 0 390 60" width="100%" height={60} preserveAspectRatio="none">
      <Path d="M0 30 C 94 30, 138 28, 175 22 C 229 14, 306 10, 390 9" color="#A9C8E4" w={1.0} />
      <Path d="M0 34 C 94 34, 140 36, 182 42 C 234 49, 310 53, 390 54" color="#DCE7F0" w={0.9} />
      <circle cx={175} cy={22} r={2.6} fill="#A9C8E4" />
    </svg>
  );
}

export function RecordIcon() {
  return (
    <svg viewBox="0 0 20 20" width={18} height={18} style={{ display: 'block' }}>
      <rect x={3.25} y={4.25} width={13.5} height={12.5} rx={2.5} fill="none" stroke="#B4B2A9" strokeWidth={1} />
      <path d="M3.25 8.25h13.5M7.5 3v2.6M12.5 3v2.6" fill="none" stroke="#B4B2A9" strokeWidth={1} strokeLinecap="round" />
      <circle cx={10} cy={12.4} r={1.1} fill="#B4B2A9" />
    </svg>
  );
}

const BRAND_PATHS = {
  kakao: ['M8 2.6c-3.2 0-5.8 2-5.8 4.5 0 1.6 1.1 3 2.7 3.8l-.7 2.4 2.7-1.6c.4.06.7.08 1.1.08 3.2 0 5.8-2 5.8-4.6S11.2 2.6 8 2.6Z'],
  google: ['M13.2 8.1c0 3-2.2 5-5.2 5a5.1 5.1 0 1 1 3.5-8.8', 'M8.2 8.1h5'],
  apple: [
    'M11.1 8.6c0-1.5 1.2-2.2 1.3-2.3-.7-1-1.8-1.2-2.2-1.2-1-.1-1.9.6-2.4.6-.5 0-1.2-.6-2-.5-1 0-2 .6-2.5 1.5-1.1 1.9-.3 4.7.8 6.2.5.7 1.1 1.5 1.9 1.5.8 0 1-.5 1.9-.5.9 0 1.1.5 1.9.5.8 0 1.3-.7 1.8-1.4.4-.6.6-1.2.6-1.2s-1.1-.4-1.1-1.7Z',
    'M9.6 3.8c.4-.5.7-1.2.6-1.9-.6 0-1.4.4-1.8 1-.4.5-.7 1.2-.6 1.9.7 0 1.4-.4 1.8-1Z',
  ],
};

export function BrandIcon({ kind }) {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} style={{ display: 'block' }}>
      {BRAND_PATHS[kind].map(d => (
        <path key={d} d={d} fill="none" stroke="#6B6A64" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}
