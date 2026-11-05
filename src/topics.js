import PARADOXES from '../content/paradoxes.json';
import { TODAY } from './questionData.js';
import { DAY } from './achievements.js';

// 검증을 마친 주제만 보입니다. 개발 서버에서는 검증 전 주제도 확인할 수 있습니다.
// 하루 5개를 날짜에 따라 돌아가며 보여 줍니다.
const VISIBLE = PARADOXES.filter(p => import.meta.env.DEV || p.checked);
const DAY_NO = Math.floor(Date.parse(TODAY.date) / DAY);
export const TOPICS = VISIBLE.length <= 5 ? VISIBLE : Array.from({ length: 5 }, (_, i) => VISIBLE[(DAY_NO * 5 + i) % VISIBLE.length]);
