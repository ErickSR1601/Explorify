import "../styles/components/Article.css";

import DOMPurify from "dompurify";

export default function Article({ title, content, author, date }) {
  const safeContent = DOMPurify.sanitize(content);

  return (
    <div className="article-card">
      <h2 className="article-title">{title}</h2>
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: safeContent }}
      />
      <div className="article-footer">
        <span className="article-author">{author}</span>
        <span className="article-date">{date}</span>
      </div>
    </div>
  );
}
