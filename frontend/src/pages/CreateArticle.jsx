import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/Api";

import "../styles/pages/CreateArticle.css";

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const payload = { title, content };
      await API.post("/articles", payload);
      setMessage("Artículo creado exitosamente.");
      setTitle("");
      setContent("");
      // TODO Redirect to the new article in profile
      navigate("/");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error al crear el artículo."
      );
    }
  };

  const handleCancel = () => {
    // TODO Future redirect to profile
    navigate("/"); 
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
          <textarea
            name="content"
            placeholder="Contenido del artículo"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="create-article-textarea"
            rows="6"
            required
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
