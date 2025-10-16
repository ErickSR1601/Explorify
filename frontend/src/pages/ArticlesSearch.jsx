import React, { useState, useEffect } from "react";
import Article from "../components/Article";
import API from "../api/Api";
import "../styles/pages/SearchPage.css";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchArticles = async (endpoint = "/articles", payload = null) => {
    try {
      setLoading(true);
      setError("");
      const res = payload
        ? await API.post(endpoint, payload)
        : await API.get(endpoint);

      setArticles(res.data);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError(err.response?.data?.message || "Hubo un problema al buscar los artículos.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    fetchArticles("/articles/search", { title: searchTerm });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="search-page">
      <h1 className="search-title">Buscar artículos</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Escribe un título para buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>

      {loading && <p className="search-loading">Buscando artículos...</p>}
      {error && <p className="search-error">{error}</p>}

      <div className="search-results">
        {articles.length === 0 && !loading ? (
          <p className="no-results">No se encontraron artículos.</p>
        ) : (
          articles.map((article) => (
            <Article
              key={article._id}
              title={article.title}
              content={article.content}
              author={article.author?.name || "Autor desconocido"}
              date={new Date(article.createdAt).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
              tags={article.tags || []}
            />
          ))
        )}
      </div>
    </div>
  );
}
