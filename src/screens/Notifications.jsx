import { Avatar, Icon } from '../components/UI.jsx';
import { notifications } from '../store.js';
import { TOPICS } from '../topics.js';

function message(n) {
  const who = n.members.length > 1 ? `${n.members[0].name} 님 외 ${n.members.length - 1}명이` : `${n.members[0].name} 님이`;
  if (n.kind === 'like') return `${who} 내 댓글에 공감했어요`;
  return `${who} 내 댓글에 답글을 남겼어요`;
}

export default function Notifications({ state, go }) {
  const list = notifications(state);
  const openTopic = topicId => go(TOPICS.some(t => t.id === topicId) ? `feed/${topicId}/comments` : 'feed');
  return <div className="list">{list.map(n => n.kind === 'fruit'
    ? <button className="list-row notice-row" key={n.id} onClick={() => go('records')}><span className="avatar sage"><Icon name="fruit" size={20} /></span><span>{n.achievement.name} 열매를 맺었어요</span></button>
    : <button className="list-row notice-row" key={n.id} onClick={() => openTopic(n.topicId)}><Avatar {...n.members[0]} /><span>{message(n)}{n.text && <small className="hint">{n.text}</small>}</span></button>)}</div>;
}
