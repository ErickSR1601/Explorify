import { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "../styles/components/ArticleEditModal.css";

export default function ArticleEditModal({ isOpen, article, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        [{ header: [2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
      ],
    },
    theme: "snow",
  });

  useEffect(() => {
    if (article) {
      setTitle(article.title || "");
      setContent(article.content || "");
      setTags(article.tags ? article.tags.join(", ") : "");

      if (quill) {
        quill.clipboard.dangerouslyPasteHTML(article.content || "");
      }
    }
  }, [article, quill]);

  useEffect(() => {
    if (quill) {
      const handler = () => setContent(quill.root.innerHTML);
      quill.on("text-change", handler);
      setContent(quill.root.innerHTML);
      return () => quill.off("text-change", handler);
    }
  }, [quill]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    onSave({ ...article, title, content, tags: formattedTags });
    onClose();
  };

  return (
    <div className="article-edit-modal-overlay">
      <div className="article-edit-modal-content">
        <span className="article-edit-close" onClick={onClose}>
          &times;
        </span>
        <h3>Editar Artículo</h3>

        <form onSubmit={handleSubmit} className="article-edit-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            required
            className="article-edit-input"
          />

          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Etiquetas (separadas por comas)"
            className="article-edit-input"
          />

          <div ref={quillRef} className="article-edit-textarea" />

          <div className="article-edit-buttons">
            <button type="submit" className="btn btn-change">
              Guardar cambios
            </button>
            <button type="button" className="btn btn-delete" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
