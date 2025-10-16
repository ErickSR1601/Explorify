import Article from "../components/Article";
import { useEffect, useState } from "react";
import API from "../api/Api";

import "../styles/pages/ArticlesPage.css";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await API.get("/articles");
        const formatted = data.map((article) => ({
          title: article.title,
          content: article.content,
          author: article.author?.name || "Anónimo",
          date: new Date(article.createdAt).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          tags: article.tags || [],
        }));

        setArticles(formatted);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Error al obtener los artículos del servidor."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p className="loading-text">Cargando artículos...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="articles-container">
      {articles.map((article, index) => (
        <Article key={index} {...article} />
      ))}
    </div>
  );
}
