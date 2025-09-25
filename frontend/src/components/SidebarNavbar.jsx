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

export default function SidebarNavbar({ isOpen, setIsOpen, isLoggedIn }) {
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
            <button className="sidebar-btn">
              <User size={20} />
              <span>Perfil</span>
            </button>

            <button className="sidebar-btn">
              <Search size={20} />
              <span>Buscar</span>
            </button>

            {isLoggedIn ? (
              <>
                <button className="sidebar-btn">
                  <FilePlus size={20} />
                  <span>Publicar artículo</span>
                </button>
              </>
            ) : (
              <>
                <button className="sidebar-btn">
                  <UserPlus size={20} />
                  <span>Registrarse</span>
                </button>

                <button className="sidebar-btn">
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
