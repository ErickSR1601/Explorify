import React, { useState, useEffect } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import "../styles/components/ArticleEditModal.css";

export default function ArticleEditModal({ isOpen, article, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (article) {
      setTitle(article.title || "");
      setTags(article.tags ? article.tags.join(", ") : "");

      if (article.content) {
        try {
          const contentState = convertFromRaw(JSON.parse(article.content));
          setEditorState(EditorState.createWithContent(contentState));
        } catch {
          const contentState = ContentState.createFromText(article.content);
          setEditorState(EditorState.createWithContent(contentState));
        }
      } else {
        setEditorState(EditorState.createEmpty());
      }
    }
  }, [article]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

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

          <div className="create-article-editor">
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              placeholder="Escribe el contenido del artículo..."
              toolbar={{
                options: ["inline", "blockType", "list"],
                inline: { options: ["bold", "italic", "underline"] },
                blockType: {
                  inDropdown: false,
                  options: ["Normal", "H1", "H2"],
                },
                list: { options: ["unordered", "ordered"] },
              }}
            />
          </div>

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
