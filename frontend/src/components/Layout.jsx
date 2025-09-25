import { useState } from "react";
import SidebarNavbar from "./SidebarNavbar";
import "../styles/components/Layout.css";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoggedIn = Boolean(sessionStorage.getItem("userInfo"));

  return (
    <div className="main-container">
      <SidebarNavbar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isLoggedIn={isLoggedIn}
      />
      <div className="page-content">{children}</div>
    </div>
  );
}
