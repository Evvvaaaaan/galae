import PARADOXES from '../content/paradoxes.json';

// 검증을 마친 주제만 보입니다. 개발 서버에서는 검증 전 주제도 확인할 수 있습니다.
export const TOPICS = PARADOXES.filter(p => import.meta.env.DEV || p.checked);
