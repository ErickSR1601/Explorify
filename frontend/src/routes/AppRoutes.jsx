import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegisterUser from "../pages/RegisterUser";
import Login from "../pages/LoginUser";
import ArticlesPage from "../pages/ArticlesPage";
import CreateArticle from "../pages/CreateArticle";

import ProtectedRoute from "./ProtectedRoutes";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        {/* Users routes*/}
        <Route path="/users/new" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />
        {/* Articles routes */}
        <Route path="/" element={<ArticlesPage />} />

        {/* Private routes */}
        {/* Articles routes */}
        <Route
          path="/articles/new"
          element={
            <ProtectedRoute>
              <CreateArticle />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
