import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { registerAccount } from "../../services/contentApi";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000",
  timeout: 10000,
});

export default function Login() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        const { token, user } = response.data.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("authUser", JSON.stringify(user));
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          (err.response?.data as { message?: string } | undefined)?.message ??
            "Login failed. Please check your credentials."
        );
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Password and confirmation must match");
      setLoading(false);
      return;
    }

    try {
      const { token, user } = await registerAccount({
        name,
        email,
        password,
      });

      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          (err.response?.data as { message?: string } | undefined)?.message ??
            "Registration failed. Please check your data."
        );
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = mode === "login" ? handleLogin : handleRegister;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-2">
          {mode === "login" ? "Admin Access" : "Create Account"}
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          {mode === "login" ? "Sign in with your email and password" : "Register a new account with your email"}
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
                placeholder="Your full name"
                required
                disabled={loading}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
              placeholder="user@example.com"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>
          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
                placeholder="Confirm your password"
                required
                disabled={loading}
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
            disabled={loading}
          >
            {loading ? (mode === "login" ? "Signing in..." : "Creating account...") : mode === "login" ? "Sign In" : "Register"}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode((current) => (current === "login" ? "register" : "login"));
              setError("");
            }}
            className="w-full text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
            disabled={loading}
          >
            {mode === "login" ? "Need an account? Register here" : "Already have an account? Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
