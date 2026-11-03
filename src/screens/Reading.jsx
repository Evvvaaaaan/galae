export default function Reading({ question, next }) {
  return <div className="flow">
    <h1 className="flow-title" tabIndex={-1}>확장하기</h1>
    {question.reading.perspectives.map(p => <section className="perspective" key={p.label}>
      <h2>{p.label}</h2>
      <p className="reading-body">{p.body}</p>
      {p.verse && <figure className="verse"><blockquote>{p.verse}</blockquote><figcaption>{p.ref}</figcaption></figure>}
    </section>)}
    <div className="cta-bar"><button className="btn-primary" onClick={next}>다음</button></div>
  </div>;
}
