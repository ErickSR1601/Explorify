import { useState } from "react";
import draftToHtml from "draftjs-to-html";
import "../styles/components/Article.css";
import useTruncatedHTML from "../hook/useTruncatedHTML";

export default function Article({ title, content, author, date, tags = [] }) {
  const [expanded, setExpanded] = useState(false);

  let parsedHTML = "";
  try {
    const rawContent = JSON.parse(content);
    parsedHTML = draftToHtml(rawContent);
  } catch {
    parsedHTML = content; 
  }

  const { safeContent, previewHTML } = useTruncatedHTML(parsedHTML, 1000);

  return (
    <div className="article-card">
      <h2 className="article-title">{title}</h2>

      <div
        className="article-content"
        dangerouslySetInnerHTML={{
          __html: expanded ? safeContent : previewHTML,
        }}
      />

      <button className="see-more-btn" onClick={() => setExpanded(!expanded)}>
        {expanded ? "Ver menos" : "Ver más..."}
      </button>

      {tags.length > 0 && (
        <div className="article-tags">
          {tags.map((tag, index) => (
            <span key={index} className="article-tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="article-footer">
        <span className="article-author">{author}</span>
        <span className="article-date">{date}</span>
      </div>
    </div>
  );
}
