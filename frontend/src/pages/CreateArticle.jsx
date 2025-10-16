import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/Api";

// Import of Quill and its React wrapper
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; 

import "../styles/pages/CreateArticle.css";

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Editor setup
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
    if (quill) {
      quill.on("text-change", () => {
        setContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const payload = { title, content, tags: tagsArray };
      await API.post("/articles", payload);

      setMessage("Artículo creado exitosamente.");
      setTitle("");
      setContent("");
      navigate("/users/profile");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error al crear el artículo."
      );
    }
  };

  const handleCancel = () => {
    navigate("/users/profile"); 
  };

  return (
    <div className="create-article-container">
      <div className="create-article-card">
        <h2 className="create-article-title">Crear Artículo</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Título del artículo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="create-article-input"
            required
          />

          <input
            type="text"
            name="tags"
            placeholder="Etiquetas (separadas por comas, ej: Japón, Cultura, Asia)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="create-article-input"
          />

          <div
            ref={quillRef}
            className="create-article-editor"
            style={{ height: "250px", marginBottom: "20px" }}
          />

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
