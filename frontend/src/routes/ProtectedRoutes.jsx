import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  if (!userInfo || !userInfo.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
