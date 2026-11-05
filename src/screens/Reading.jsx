export default function Reading({ question, next }) {
  return <div className="flow">
    <h1 className="flow-title" tabIndex={-1}>확장하기</h1>
    {(question.reading?.perspectives || []).map(p => <section className="perspective" key={p.label}>
      <h2>{p.label}</h2>
      <p className="reading-body">{p.body}</p>
      {p.verse && <figure className="verse"><blockquote>{p.verse}</blockquote><figcaption>{p.ref}</figcaption></figure>}
      {p.openQuestion && <p className="reading-body">{p.openQuestion}</p>}
    </section>)}
    {!question.reading?.perspectives.length && <p className="hint">아직 공개된 해설이 없어요</p>}
    <div className="cta-bar"><button className="btn-primary" onClick={next}>다음</button></div>
  </div>;
}
