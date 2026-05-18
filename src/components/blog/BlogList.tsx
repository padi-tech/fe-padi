import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getBlogs, type BlogItem } from "../../services/contentApi";

const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (error.response?.data as { message?: string } | undefined)?.message ?? "Failed to fetch blogs";
  }

  return "Failed to fetch blogs";
};

const stripHtml = (html: string): string => html.replace(/<[^>]*>/g, "").trim();

export default function BlogList() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    const loadBlogs = async () => {
      try {
        const data = await getBlogs();

        if (mounted) {
          setBlogs(data);
          setError("");
        }
      } catch (err) {
        if (mounted) {
          setError(extractErrorMessage(err));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void loadBlogs();

    return () => {
      mounted = false;
    };
  }, []);

  const renderedBlogs = useMemo(() => blogs, [blogs]);

  if (loading) {
    return <div className="text-center py-16 text-gray-500">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Latest Updates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {renderedBlogs.map((b) => (
          <article key={b.id} className="bg-white p-6 border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between">
            <div>
              <div className="text-purple-600 text-sm font-semibold mb-3">Blog Post</div>
              <h2 className="text-2xl font-bold mb-3 text-gray-900 leading-tight">
                <Link to={`/blog/${b.id}`} className="hover:text-purple-600 transition-colors">
                  {b.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{stripHtml(b.content).slice(0, 140)}...</p>
            </div>
            <div className="flex items-center gap-3 mt-auto">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700">
                {b.author?.name?.[0] ?? "A"}
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{b.author?.name ?? "Admin"}</p>
                <p className="text-gray-500">Read more →</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
