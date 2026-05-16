import React from "react";
import { Routes, Route } from "react-router-dom";
import BlogList from "../components/blog/BlogList";
import BlogDetail from "../components/blog/BlogDetail";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path=":id" element={<BlogDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
