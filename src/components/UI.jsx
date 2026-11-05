export function Icon({ name, size = 22 }) {
  const paths = {
    today: 'M3 10 12 3l9 7M5 9v11h5v-6h4v6h5V9',
    archive: 'M4 4h16v4H4zM6 8v12h12V8M10 12h4',
    feed: 'M4 7c4-3 12-3 16 0M4 12c4-3 12-3 16 0M4 17c4-3 12-3 16 0',
    search: 'm21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
    groups: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M17 4a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.87M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
    records: 'M4 5h16v15H4zM4 10h16M8 3v4M16 3v4',
    me: 'M20 21a8 8 0 0 0-16 0M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
    back: 'm14 5-7 7 7 7', next: 'm10 5 7 7-7 7', arrow: 'M4 12h16m-6-6 6 6-6 6',
    check: 'm5 12 4 4L19 6', send: 'M5 12h14m-6-6 6 6-6 6', settings: 'M4 7h9M17 7h3M4 17h3M11 17h9M15 5v4M9 15v4', more: 'M5 12h.01M12 12h.01M19 12h.01',
    comment: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z', share: 'M12 15V3M7 8l5-5 5 5M5 13v7h14v-7',
    up: 'M12 19V5m-6 6 6-6 6 6', plus: 'M12 5v14M5 12h14', close: 'M6 6l12 12M18 6 6 18',
    gear: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2zM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.arrow} /></svg>;
}

// 공유 창을 띄우고, 공유 창이 없으면 copyText를 복사합니다. 복사했으면 true를 돌려줍니다.
export async function shareOrCopy(data, copyText) {
  if (navigator.share) {
    try { await navigator.share(data); } catch { /* 공유 창을 닫았습니다. */ }
    return false;
  }
  try { await navigator.clipboard.writeText(copyText); return true; } catch { /* 복사할 수 없는 환경입니다. */ return false; }
}

export function Header({ back, title, action }) {
  return <header className="page-header">
    {back ? <button className="icon-button" aria-label="뒤로" onClick={back}><Icon name="back" size={20} /></button> : <span />}
    {title ? <h1 tabIndex={-1}>{title}</h1> : <span />}
    {action || <span />}
  </header>;
}

export function Empty({ title, label, onClick }) {
  return <div className="empty"><p>{title}</p>{label && <button className="btn-text" onClick={onClick}>{label}</button>}</div>;
}

export function Avatar({ name, color = 'sage', photo }) {
  return <span className={`avatar ${color}`} aria-hidden="true">{photo ? <img src={photo} alt="" /> : name.slice(0, 1)}</span>;
}

// 저장 공간을 아끼려고 정사각형 256px JPEG로 줄여 둡니다.
export function resizePhoto(file, done) {
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    const size = Math.min(img.width, img.height);
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    canvas.getContext('2d').drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, 256, 256);
    done(canvas.toDataURL('image/jpeg', 0.85));
    URL.revokeObjectURL(img.src);
  };
  img.src = URL.createObjectURL(file);
}

// 누르면 그 사람의 프로필로 갑니다. 누를 곳이 없으면(내 글) 그대로 보여 줍니다.
// 아바타는 이름과 같은 곳으로 가므로 한 번만 읽히도록 숨깁니다.
export function ProfileLink({ onClick, avatar, children }) {
  if (!onClick) return children;
  return <button className="profile-link" onClick={onClick} {...(avatar && { tabIndex: -1, 'aria-hidden': true })}>{children}</button>;
}

export function BottomNav({ active, go }) {
  return <nav className="bottom-nav" aria-label="주 메뉴">{[['today', '오늘'], ['feed', '생각'], ['archive', '질문'], ['groups', '그룹'], ['records', '나', 'me']].map(([id, label, icon = id]) => <a key={id} href={`#/${id}`} aria-current={active === id ? 'page' : undefined} onClick={e => { e.preventDefault(); go(id); }}><Icon name={icon} size={21} />{label}</a>)}</nav>;
}
