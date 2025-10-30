import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import draftToHtml from "draftjs-to-html";
import "../styles/components/UserArticleCard.css";
import useTruncatedHTML from "../hook/useTruncatedHTML";

export default function UserArticleCard({ article, onDelete, onEdit }) {
  const [expanded, setExpanded] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    try {
      const parsed = JSON.parse(article.content);
      if (parsed && parsed.blocks) {
        const html = draftToHtml(parsed);
        setHtmlContent(DOMPurify.sanitize(html));
      } else {
        setHtmlContent(DOMPurify.sanitize(article.content));
      }
    } catch {
      setHtmlContent(DOMPurify.sanitize(article.content));
    }
  }, [article.content]);

  const { safeContent, previewHTML } = useTruncatedHTML(htmlContent, 1000);

  return (
    <div className="user-article-card">
      <h2 className="article-title">{article.title}</h2>

      <div
        className={`article-content ${expanded ? "expanded" : "collapsed"}`}
        dangerouslySetInnerHTML={{
          __html: expanded ? safeContent : previewHTML,
        }}
      />

      <button className="see-more-btn" onClick={() => setExpanded(!expanded)}>
        {expanded ? "Ver menos" : "Ver más..."}
      </button>

      {article.tags && article.tags.length > 0 && (
        <div className="article-tags">
          {article.tags.map((tag, index) => (
            <span key={index} className="article-tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="article-footer">
        <div className="article-meta">
          <span className="article-author">{article.author}</span>
          <span className="article-date">{article.date}</span>
        </div>
        <div className="article-actions">
          <button className="btn btn-edit" onClick={() => onEdit(article._id)}>
            Editar artículo
          </button>
          <button
            className="btn btn-delete"
            onClick={() => onDelete(article._id)}
          >
            Eliminar artículo
          </button>
        </div>
      </div>
    </div>
  );
}
