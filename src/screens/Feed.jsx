import { Fragment, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PARADOXES from '../../content/paradoxes.json';
import { Avatar, Empty, Icon } from '../components/UI.jsx';
import { MEMBERS, SAMPLE_COMMENTS, TODAY } from '../questionData.js';

// 검증을 마친 주제만 보입니다. 개발 서버에서는 검증 전 주제도 확인할 수 있습니다.
// 하루 5개를 날짜에 따라 돌아가며 보여 줍니다.
const VISIBLE = PARADOXES.filter(p => import.meta.env.DEV || p.checked);
const DAY = Math.floor(Date.parse(TODAY.date) / 86400000);
export const TOPICS = VISIBLE.length <= 5 ? VISIBLE : Array.from({ length: 5 }, (_, i) => VISIBLE[(DAY * 5 + i) % VISIBLE.length]);

export default function Feed({ initialTopic, comments, likes, profile, onComment, onLike }) {
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
      <div className="feed-page feed-end"><Empty title="모든 생각을 다 보셨어요" /></div>
    </div>
    {open && <Comments key={open} frame={feedRef.current.closest('.frame')} topic={TOPICS.find(t => t.id === open)} comments={comments.filter(c => c.topicId === open)} likes={likes} profile={profile} onComment={onComment} onLike={onLike} onClose={() => setOpen(null)} />}
  </>;
}

function Comments({ frame, topic, comments, likes, profile, onComment, onLike, onClose }) {
  const [text, setText] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [shown, setShown] = useState([]);
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(null);
  const sheetRef = useRef(null);
  // 열 때 시트로 포커스를 옮기고, 닫으면 누른 버튼으로 돌려줍니다.
  useEffect(() => {
    const opener = document.activeElement;
    sheetRef.current.focus({ preventScroll: true });
    return () => opener?.focus?.({ preventScroll: true });
  }, []);
  // 손잡이를 위로 끌면 화면을 다 채우고, 아래로 끌면 줄어들거나 닫힙니다. 짧게 누르면 바로 닫힙니다.
  const [full, setFull] = useState(false);
  const delta = drag ? drag.y - drag.start : 0;
  const frameH = frame.clientHeight;
  const baseH = full ? frameH : frameH * 0.75;
  let style;
  if (delta < 0 || (full && delta > 0)) style = { height: Math.min(frameH, Math.max(frameH * 0.75, baseH - delta)) };
  else if (delta > 0) style = { transform: `translateY(${delta}px)` };
  function endDrag() {
    if (!drag) return;
    if (Math.abs(delta) < 4) onClose();
    else if (delta < -80) setFull(true);
    else if (delta > 80) full ? setFull(false) : onClose();
    setDrag(null);
  }
  const me = { name: profile.name || '나', handle: profile.handle || profile.name || '나', color: profile.color };
  function send(e) { e.preventDefault(); if (!text.trim()) return; onComment(topic.id, text, replyTo?.id); if (replyTo && !shown.includes(replyTo.id)) setShown([...shown, replyTo.id]); setText(''); setReplyTo(null); }
  const all = [
    ...SAMPLE_COMMENTS.filter(c => c.topicId === topic.id).map(c => ({ ...c, member: MEMBERS.find(m => m.id === c.memberId) })),
    ...comments.map(c => ({ ...c, member: me, likes: 0 })),
  ];
  // 답글에 다시 답글을 달면 같은 댓글 아래에 이어 붙입니다.
  function reply(c) { setReplyTo({ id: c.parentId || c.id, handle: c.member.handle }); inputRef.current.focus(); }
  function row(c) {
    const liked = likes.includes(c.id);
    const count = c.likes + (liked ? 1 : 0);
    return <li key={c.id} className={c.parentId ? 'reply' : undefined}>
      <Avatar {...c.member} />
      <div className="comment-body"><p className="preserve-lines"><strong className="comment-name">{c.member.handle}</strong> {c.text}</p><button className="comment-reply" onClick={() => reply(c)}>답글 달기</button></div>
      <button className={`comment-like ${liked ? 'on' : ''}`} aria-label="공감" aria-pressed={liked} onClick={() => onLike(c.id)}><Icon name="up" size={15} />{count > 0 && <span>{count}</span>}</button>
    </li>;
  }
  return createPortal(<>
    <button className="sheet-backdrop" aria-label="닫기" onClick={onClose} />
    <div className={`sheet ${full ? 'full' : ''} ${drag ? 'dragging' : ''}`} style={style} role="dialog" aria-modal="true" aria-label={`${topic.title} 댓글`} tabIndex={-1} ref={sheetRef} onKeyDown={e => { if (e.key === 'Escape') onClose(); }}>
      <button className="sheet-handle" aria-label="닫기"
        onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); setDrag({ start: e.clientY, y: e.clientY }); }}
        onPointerMove={e => drag && setDrag({ ...drag, y: e.clientY })}
        onPointerUp={endDrag} onPointerCancel={() => setDrag(null)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClose(); } }}><span /></button>
      <ul className="comment-list">
        {all.filter(c => !c.parentId).map(c => {
          const replies = all.filter(r => r.parentId === c.id);
          const open = shown.includes(c.id);
          return <Fragment key={c.id}>
            {row(c)}
            {replies.length > 0 && <li className="reply"><button className="comment-replies" aria-expanded={open} onClick={() => setShown(open ? shown.filter(id => id !== c.id) : [...shown, c.id])}>{open ? '답글 숨기기' : `답글 보기 (${replies.length}개)`}</button></li>}
            {open && replies.map(row)}
          </Fragment>;
        })}
      </ul>
      <form className="chat-input" onSubmit={send}>
        {replyTo && <button type="button" className="icon-button" aria-label="답글 취소" onClick={() => setReplyTo(null)}><Icon name="close" size={18} /></button>}
        <input ref={inputRef} aria-label="댓글" placeholder={replyTo ? `${replyTo.handle}님에게 답글` : '댓글'} maxLength={300} value={text} onChange={e => setText(e.target.value)} />
        <button className="icon-button" aria-label="보내기" disabled={!text.trim()}><Icon name="send" size={20} /></button>
      </form>
    </div>
  </>, frame);
}
