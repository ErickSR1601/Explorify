import "../styles/components/Article.css";

export default function Article({ title, content, author, date }) {
  return (
    <div className="article-card">
      <h2 className="article-title">{title}</h2>
      <p className="article-content">{content}</p>
      <div className="article-footer">
        <span className="article-author">{author}</span>
        <span className="article-date">{date}</span>
      </div>
    </div>
  );
}
