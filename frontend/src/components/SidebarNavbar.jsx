import { 
  MapPin, 
  Search, 
  User, 
  FilePlus, 
  LogOut, 
  Menu, 
  X, 
  UserPlus, 
  LogIn 
} from "lucide-react";
import "../styles/components/SidebarNavbar.css";

import { useNavigate } from "react-router-dom";

export default function SidebarNavbar({ isOpen, setIsOpen, isLoggedIn }) {

  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/users/profile");
  };

  const goToCreateArticle = () => {
    navigate("/articles/new");
  };

  const goToRegisterUser = () => {
    navigate("/users/new");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Hamburguer button */}
      <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div>

          <div className="sidebar-header">
            <MapPin size={28} className="sidebar-icon-brand" />
            <h1 className="sidebar-title">Explorify</h1>
          </div>

          {/* Main navigation */}
          <nav className="sidebar-nav">
            <button className="sidebar-btn" onClick={goToProfile}>
              <User size={20} />
              <span>Perfil</span>
            </button>

            <button className="sidebar-btn">
              <Search size={20} />
              <span>Buscar</span>
            </button>

            {isLoggedIn ? (
              <>
                <button className="sidebar-btn" onClick={goToCreateArticle}>
                  <FilePlus size={20} />
                  <span>Publicar artículo</span>
                </button>
              </>
            ) : (
              <>
                <button className="sidebar-btn" onClick={goToRegisterUser}>
                  <UserPlus size={20} />
                  <span>Registrarse</span>
                </button>

                <button className="sidebar-btn" onClick={goToLogin}>
                  <LogIn size={20} />
                  <span>Iniciar sesión</span>
                </button>
              </>
            )}
          </nav>
        </div>

        {/* Footer */}
        {isLoggedIn && (
          <div className="sidebar-footer">
            <button
              className="sidebar-logout"
              onClick={() => {
                sessionStorage.removeItem("userInfo"); 
                window.location.reload(); 
              }}
            >
              <LogOut size={20} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        )}
      </div>

      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
}
