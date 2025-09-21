import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegisterUser from "../pages/RegisterUser";
import Login from "../pages/LoginUser";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/users/new" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
