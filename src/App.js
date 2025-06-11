import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProductPage from "./pages/ProductPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        {/* Layout wrapper adds Navbar above all private pages */}
        <Route element={<><Navbar /><Outlet /></>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
