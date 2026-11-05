import { Fragment, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Avatar, Empty, Header, Icon, ProfileLink, SourceItem } from '../components/UI.jsx';

// 위아래로 넘기며 주제의 썸네일과 제목을 봅니다. 누르면 내용 페이지로 갑니다.
// 1분에 500자쯤 읽는다고 보고 계산합니다.
const readMinutes = topic => Math.max(1, Math.round(topic.cards.reduce((n, c) => n + c.text.length, 0) / 500));

export default function Feed({ topics: TOPICS, initialTopic, comments, onOpen }) {
  const feedRef = useRef(null);
  useEffect(() => {
    if (initialTopic) feedRef.current.querySelector(`[data-topic="${initialTopic}"]`)?.scrollIntoView({ block: 'start' });
  }, [initialTopic]);

  return <div className="feed" ref={feedRef}>
    <h1 className="visually-hidden" tabIndex={-1}>생각</h1>
    {TOPICS.map(topic => <section className="feed-page" key={topic.id} data-topic={topic.id}>
      <button className="feed-card" onClick={() => onOpen(topic.id)}>
        <span className="feed-meta"><span><Icon name="clock" size={16} />{readMinutes(topic)}분</span><span><Icon name="comment" size={16} />{comments.filter(c => c.topicId === topic.id).length}</span></span>
        {topic.thumbnail && <img src={topic.thumbnail} alt="" />}
        <h2>{topic.title}</h2>
        <p>{topic.cards[0].text}</p>
      </button>
    </section>)}
    <div className="feed-page feed-end"><Empty title="모든 생각을 다 보셨어요" /></div>
  </div>;
}

// 주제의 내용 페이지입니다. 단락을 이어 읽고, 맨 아래에 출처가 있습니다.
export function TopicPage({ topic, initialComments, back, comments, likes, profile, onComment, onLike, onProfile }) {
  const pageRef = useRef(null);
  // 알림이나 프로필에서 돌아오면 댓글 시트를 연 채로 보여 줍니다.
  // 시트는 페이지가 그려진 뒤에 열어야 화면 틀을 찾을 수 있습니다.
  const [open, setOpen] = useState(false);
  useEffect(() => { if (initialComments) setOpen(true); }, [initialComments]);
  return <div className="topic-page" ref={pageRef}>
    <Header back={back} action={<button className="icon-button" aria-label="댓글" onClick={() => setOpen(true)}><Icon name="comment" size={22} /></button>} />
    <article className="topic-body">
      <h1 tabIndex={-1}>{topic.title}</h1>
      {topic.cards.map((card, i) => <p key={i}>{card.text}</p>)}
      <ul className="feed-sources">{topic.sources.map(s => <SourceItem key={s.label} source={s} />)}</ul>
    </article>
    {open && <Comments frame={pageRef.current.closest('.frame')} topic={topic} comments={comments.filter(c => c.topicId === topic.id)} likes={likes} profile={profile} onComment={onComment} onLike={onLike} onProfile={memberId => onProfile(memberId, `feed/${topic.id}/comments`)} onClose={() => setOpen(false)} />}
  </div>;
}

function Comments({ frame, topic, comments, likes, profile, onComment, onLike, onProfile, onClose }) {
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
  async function send(e) { e.preventDefault(); if (!text.trim()) return; if (!await onComment(topic.id, text, replyTo?.id)) return; if (replyTo && !shown.includes(replyTo.id)) setShown([...shown, replyTo.id]); setText(''); setReplyTo(null); }
  const all = comments;
  // 답글에 다시 답글을 달면 같은 댓글 아래에 이어 붙입니다.
  function reply(c) { setReplyTo({ id: c.parentId || c.id, handle: c.member.handle }); inputRef.current.focus(); }
  function row(c) {
    const liked = likes.includes(c.id);
    const count = c.likes;
    const link = c.memberId && (() => onProfile(c.memberId));
    return <li key={c.id} className={c.parentId ? 'reply' : undefined}>
      <ProfileLink avatar onClick={link}><Avatar {...c.member} /></ProfileLink>
      <div className="comment-body"><p className="preserve-lines"><strong className="comment-name"><ProfileLink onClick={link}>{c.member.handle}</ProfileLink></strong> {c.text}</p><button className="comment-reply" onClick={() => reply(c)}>답글 달기</button></div>
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
      {all.length === 0 ? <p className="comment-empty">아직 댓글이 없어요.</p> : <ul className="comment-list">
        {all.filter(c => !c.parentId).map(c => {
          const replies = all.filter(r => r.parentId === c.id);
          const open = shown.includes(c.id);
          return <Fragment key={c.id}>
            {row(c)}
            {replies.length > 0 && <li className="reply"><button className="comment-replies" aria-expanded={open} onClick={() => setShown(open ? shown.filter(id => id !== c.id) : [...shown, c.id])}>{open ? '답글 숨기기' : `답글 보기 (${replies.length}개)`}</button></li>}
            {open && replies.map(row)}
          </Fragment>;
        })}
      </ul>}
      <form className="chat-input" onSubmit={send}>
        {replyTo && <button type="button" className="icon-button" aria-label="답글 취소" onClick={() => setReplyTo(null)}><Icon name="close" size={18} /></button>}
        <input ref={inputRef} aria-label="댓글" placeholder={replyTo ? `${replyTo.handle}님에게 답글` : '댓글'} maxLength={300} value={text} onChange={e => setText(e.target.value)} />
        <button className="icon-button" aria-label="보내기" disabled={!text.trim()}><Icon name="send" size={20} /></button>
      </form>
    </div>
  </>, frame);
}
