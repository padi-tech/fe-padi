import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import Login from "./components/auth/Login";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (!isAuthenticated) {
    return <Navigate to="/secret-login" />;
  }
  return children;
};

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/*" element={<Blog />} />
        <Route path="/secret-login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
