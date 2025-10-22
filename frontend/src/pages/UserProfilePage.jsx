import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/Api";
import UserArticleCard from "../components/UserArticleCard";
import ChangePasswordModal from "../components/ChangePasswordModal";
import ArticleEditModal from "../components/ArticleEditModal";

import "../styles/pages/UserProfilePage.css";

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await API.get("/users/profile");

        if (!data || !data.user) {
          throw new Error("Respuesta inesperada del servidor");
        }

        setUser(data.user);
        setArticles(Array.isArray(data.articles) ? data.articles : []);

        const sortedAchievements = (data.user.achievements || [])
          .filter((ach) => ach.earned)
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setAchievements(sortedAchievements);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Error al obtener el perfil del servidor."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar la cuenta?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete("/users/delete");

      sessionStorage.removeItem("userInfo");

      alert("Tu cuenta y artículos han sido eliminados correctamente.");
      navigate("/");
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
      alert(
        error.response?.data?.message ||
          "No se pudo eliminar la cuenta. Inténtalo nuevamente."
      );
    }
  };

  const handleDeleteArticle = async (id) => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar este artículo?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/articles/${id}`);
      setArticles((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Error eliminando artículo:", error);
      alert(error.response?.data?.message || "No se pudo eliminar el artículo");
    }
  };

  const handleEditArticle = (articleId) => {
    const article = articles.find((a) => a._id === articleId);
    setSelectedArticle(article);
    setShowEditModal(true);
  };

  const handleSaveEditedArticle = async (updatedArticle) => {
    try {
      const { data } = await API.put(`/articles/${updatedArticle._id}`, {
        title: updatedArticle.title,
        content: updatedArticle.content,
        tags: updatedArticle.tags,
      });

      setArticles((prev) =>
        prev.map((a) => (a._id === data._id ? { ...a, ...data } : a))
      );
    } catch (error) {
      console.error("Error al actualizar el artículo:", error);
      alert(
        error.response?.data?.message || "No se pudo actualizar el artículo"
      );
    }
  };

  if (loading) return <p className="loading-text">Cargando perfil...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!user) return <p className="empty-text">No se encontró el perfil.</p>;

  return (
    <div className="profile-page">
      <aside className="profile-info">
        <div className="profile-top-no-avatar">
          <div className="profile-meta">
            <h3 className="profile-name">{user.name}</h3>
            <p className="profile-email">{user.email}</p>
            <p className="profile-since">
              Miembro desde:{" "}
              {new Date(user.createdAt).toLocaleDateString("es-ES")}
            </p>

            {achievements.length > 0 && (
              <div className="profile-achievements">
                <h4 className="achievements-title">Medallas obtenidas</h4>
                <div className="achievements-list">
                  {achievements.map((ach, index) => (
                    <div key={index} className="achievement-item">
                      <span className="achievement-emoji">{ach.emoji}</span>
                      <div className="achievement-info">
                        <strong>{ach.name}</strong>
                        <p className="achievement-desc">{ach.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn btn-delete" onClick={handleDeleteAccount}>
            Eliminar cuenta
          </button>
          <button
            className="btn btn-change"
            onClick={() => setShowChangePassword(true)}
          >
            Cambiar contraseña
          </button>
          <button className="btn btn-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
          <button className="btn btn-back" onClick={() => navigate("/")}>
            Volver al inicio
          </button>
        </div>
      </aside>

      <main className="profile-articles">
        {articles.length === 0 ? (
          <p className="empty-text">No has publicado artículos aún.</p>
        ) : (
          articles.map((a, i) => (
            <UserArticleCard
              key={a._id || i}
              article={{
                ...a,
                author: user.name,
                date: new Date(a.createdAt).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }),
              }}
              onEdit={handleEditArticle}
              onDelete={handleDeleteArticle}
            />
          ))
        )}
      </main>

      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />

      {showEditModal && (
        <ArticleEditModal
          isOpen={showEditModal}
          article={selectedArticle}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEditedArticle}
        />
      )}
    </div>
  );
}
