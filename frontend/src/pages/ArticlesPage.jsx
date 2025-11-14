import Article from "../components/Article";
import { useEffect, useState, useRef, useCallback } from "react";
import API from "../api/Api";
import "../styles/pages/ArticlesPage.css";

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loaderRef = useRef(null);
  const isFetchingRef = useRef(false);
  const requestedPagesRef = useRef(new Set());

  const fetchPage = useCallback(async (p) => {
    if (requestedPagesRef.current.has(p)) {
      return;
    }

    if (isFetchingRef.current) {
      return;
    }

    requestedPagesRef.current.add(p);
    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      const { data } = await API.get("/articles", {
        params: { page: p, limit: 5 },
      });

      const formatted = data.articles.map((item) => ({
        _id: item._id,
        title: item.title,
        content: item.content,
        author: item.author?.name || "Anónimo",
        date: new Date(item.createdAt).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        tags: item.tags || [],
      }));

      setArticles((prev) => [...prev, ...formatted]);

      if (typeof data.totalPages === "number") setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetch page", p, err);
      setError("Error al obtener artículos");
      requestedPagesRef.current.delete(p);
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPage(page);
  }, [page, fetchPage]);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          if (page >= totalPages) {
            return;
          }
          const nextPage = page + 1;
          if (
            requestedPagesRef.current.has(nextPage) ||
            isFetchingRef.current
          ) {
            return;
          }
          setPage((prev) => prev + 1);
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [page, totalPages]);

  return (
    <div className="articles-container">
      {error && <p className="error-text">{error}</p>}

      {articles.length === 0 && !isLoading && !error && (
        <p className="empty-text">No hay artículos para mostrar.</p>
      )}

      {articles.map((a) => (
        <Article key={a._id || a.title} {...a} />
      ))}

      {isLoading && <p className="loading-text">Cargando más...</p>}

      {page >= totalPages && articles.length > 0 && (
        <p className="loading-text">No hay más artículos</p>
      )}

      <div
        ref={loaderRef}
      />
    </div>
  );
}
