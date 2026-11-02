import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PARADOXES from '../../content/paradoxes.json';
import { DoneMotif } from '../motifs.jsx';
import { Avatar, Icon } from '../components/UI.jsx';
import { MEMBERS, SAMPLE_COMMENTS, TODAY } from '../questionData.js';

// 검증을 마친 주제만 보입니다. 개발 서버에서는 검증 전 주제도 확인할 수 있습니다.
// 하루 5개를 날짜에 따라 돌아가며 보여 줍니다.
const VISIBLE = PARADOXES.filter(p => import.meta.env.DEV || p.checked);
const DAY = Math.floor(Date.parse(TODAY.date) / 86400000);
export const TOPICS = VISIBLE.length <= 5 ? VISIBLE : Array.from({ length: 5 }, (_, i) => VISIBLE[(DAY * 5 + i) % VISIBLE.length]);

export default function Feed({ initialTopic, comments, profile, onComment }) {
  const feedRef = useRef(null);
  const [open, setOpen] = useState(null);
  const [copied, setCopied] = useState(null);
  useEffect(() => {
    if (initialTopic) feedRef.current.querySelector(`[data-topic="${initialTopic}"]`)?.scrollIntoView({ block: 'start' });
  }, [initialTopic]);

  async function share(topic) {
    const url = `${location.origin}${location.pathname}#/feed/${topic.id}`;
    if (navigator.share) {
      try { await navigator.share({ title: topic.title, text: `${topic.title}\n${topic.cards[0].text}`, url }); } catch { /* 공유를 취소했습니다. */ }
      return;
    }
    try { await navigator.clipboard.writeText(url); setCopied(topic.id); setTimeout(() => setCopied(c => c === topic.id ? null : c), 1500); } catch { /* 복사할 수 없는 환경입니다. */ }
  }

  return <>
    <div className="feed" ref={feedRef}>
      <h1 className="visually-hidden" tabIndex={-1}>생각</h1>
      {TOPICS.map(topic => <section className="feed-page" key={topic.id} data-topic={topic.id} aria-label={topic.title}>
        <article className="feed-card">
          <span className="feed-category">{topic.category}</span>
          <h2>{topic.title}</h2>
          {topic.cards.map((card, i) => <p key={i}>{card.text}</p>)}
          <footer className="feed-footer">
            <ul className="feed-sources">{topic.sources.map(s => <li key={s.label}>{s.url ? <a href={s.url} target="_blank" rel="noreferrer">{s.label}</a> : s.label}</li>)}</ul>
            <div className="feed-actions">
          <button className="icon-button" aria-label="댓글" onClick={() => setOpen(topic.id)}><Icon name="comment" size={22} /></button>
          <button className="icon-button" aria-label={copied === topic.id ? '링크 복사됨' : '공유'} onClick={() => share(topic)}><Icon name={copied === topic.id ? 'check' : 'share'} size={22} /></button>
            </div>
          </footer>
        </article>
      </section>)}
      <div className="feed-page feed-end"><DoneMotif /></div>
    </div>
    {open && <Comments key={open} frame={feedRef.current.closest('.frame')} topic={TOPICS.find(t => t.id === open)} comments={comments.filter(c => c.topicId === open)} profile={profile} onComment={onComment} onClose={() => setOpen(null)} />}
  </>;
}

function Comments({ frame, topic, comments, profile, onComment, onClose }) {
  const [text, setText] = useState('');
  const [drag, setDrag] = useState(null);
  const sheetRef = useRef(null);
  // 열 때 시트로 포커스를 옮기고, 닫으면 누른 버튼으로 돌려줍니다.
  useEffect(() => {
    const opener = document.activeElement;
    sheetRef.current.focus();
    return () => opener?.focus?.();
  }, []);
  // 손잡이를 아래로 끌어 닫습니다. 짧게 누르면 바로 닫힙니다.
  const offset = drag ? Math.max(0, drag.y - drag.start) : 0;
  function endDrag() { if (drag && (offset > 80 || offset < 4)) onClose(); setDrag(null); }
  const me = { name: profile.name || '나', color: profile.color };
  function send(e) { e.preventDefault(); if (!text.trim()) return; onComment(topic.id, text); setText(''); }
  return createPortal(<>
    <button className="sheet-backdrop" aria-label="닫기" onClick={onClose} />
    <div className={`sheet ${drag ? 'dragging' : ''}`} style={offset ? { transform: `translateY(${offset}px)` } : undefined} role="dialog" aria-modal="true" aria-label={`${topic.title} 댓글`} tabIndex={-1} ref={sheetRef} onKeyDown={e => { if (e.key === 'Escape') onClose(); }}>
      <button className="sheet-handle" aria-label="닫기"
        onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); setDrag({ start: e.clientY, y: e.clientY }); }}
        onPointerMove={e => drag && setDrag({ ...drag, y: e.clientY })}
        onPointerUp={endDrag} onPointerCancel={() => setDrag(null)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClose(); } }}><span /></button>
      <ul className="comment-list">
        {SAMPLE_COMMENTS.filter(c => c.topicId === topic.id).map((c, i) => {
          const member = MEMBERS.find(m => m.id === c.memberId);
          return <li key={i}><Avatar {...member} /><div><span className="bubble-name">{member.name} <small>예시</small></span><p className="preserve-lines">{c.text}</p></div></li>;
        })}
        {comments.map(c => <li key={c.id}><Avatar {...me} /><div><span className="bubble-name">{me.name}</span><p className="preserve-lines">{c.text}</p></div></li>)}
      </ul>
      <form className="chat-input" onSubmit={send}>
        <input aria-label="댓글" placeholder="댓글" maxLength={300} value={text} onChange={e => setText(e.target.value)} />
        <button className="icon-button" aria-label="보내기" disabled={!text.trim()}><Icon name="send" size={20} /></button>
      </form>
    </div>
  </>, frame);
}
