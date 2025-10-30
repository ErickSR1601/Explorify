import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/Api";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "../styles/pages/CreateArticle.css";

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const content = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );

      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const payload = { title, content, tags: tagsArray };
      await API.post("/articles", payload);

      setMessage("Artículo creado exitosamente.");
      setTitle("");
      setEditorState(EditorState.createEmpty());
      navigate("/users/profile");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error al crear el artículo."
      );
    }
  };

  const handleCancel = () => navigate("/");

  return (
    <div className="create-article-container">
      <div className="create-article-card">
        <h2 className="create-article-title">Crear Artículo</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título del artículo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="create-article-input"
            required
          />

          <input
            type="text"
            placeholder="Etiquetas (separadas por comas, ej: Japón, Cultura, Asia)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="create-article-input"
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

          <button type="submit" className="create-article-button">
            Guardar
          </button>
          <button
            type="button"
            className="create-article-cancel-button"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
