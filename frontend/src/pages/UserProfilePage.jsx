import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/Api";
import Article from "../components/Article";
import ChangePasswordModal from "../components/ChangePasswordModal"; 

import "../styles/pages/UserProfilePage.css";

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false); 

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
    // TODO Delete account flow
    navigate("/");
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
            <Article
              key={a._id || i}
              title={a.title}
              content={a.content}
              author={user.name}
              date={new Date(a.createdAt).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            />
          ))
        )}
      </main>

      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  );
}
