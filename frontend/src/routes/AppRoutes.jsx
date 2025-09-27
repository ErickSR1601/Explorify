import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegisterUser from "../pages/RegisterUser";
import Login from "../pages/LoginUser";
import ArticlesPage from "../pages/ArticlesPage";
import CreateArticle from "../pages/CreateArticle";
import UserProfilePage from "../pages/UserProfilePage";

import ProtectedRoute from "./ProtectedRoutes";
import Layout from "../components/Layout";
import { User } from "lucide-react";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        {/* Users routes*/}
        <Route path="/users/new" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />
        {/* Articles routes */}
        <Route
          path="/"
          element={
            <Layout>
              <ArticlesPage />
            </Layout>
          }
        />

        {/* Private routes */}
        {/* Articles routes */}
        <Route
          path="/articles/new"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateArticle />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/*User routes */}
        <Route
          path="/users/profile"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
