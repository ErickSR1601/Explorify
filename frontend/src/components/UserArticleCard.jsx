import "../styles/components/UserArticleCard.css";

export default function UserArticleCard({ article, onDelete, onEdit }) {
  return (
    <div className="user-article-card">
      <h2 className="article-title">{article.title}</h2>

      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

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
