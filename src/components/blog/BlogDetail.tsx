import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { getBlogById, type BlogItem } from "../../services/contentApi";

const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (error.response?.data as { message?: string } | undefined)?.message ?? "Failed to fetch blog detail";
  }

  return "Failed to fetch blog detail";
};

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("Blog id is required");
      return;
    }

    let mounted = true;

    const loadBlog = async () => {
      try {
        const data = await getBlogById(id);

        if (mounted) {
          setPost(data);
          setError("");
        }
      } catch (err) {
        if (mounted) {
          setError(extractErrorMessage(err));
          setPost(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void loadBlog();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="text-center py-20 text-xl font-bold">Loading post...</div>;
  if (error) return <div className="text-center py-20 text-xl font-bold text-red-600">{error}</div>;
  if (!post) return <div className="text-center py-20 text-xl font-bold">Post not found</div>;
  
  return (
    <article className="max-w-3xl mx-auto bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-gray-100">
      <Link to="/blog" className="inline-block mb-8 text-purple-600 font-medium hover:text-purple-800 transition-colors">
        ← Back to Blogs
      </Link>
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">{post.title}</h1>
      <div className="flex items-center gap-4 mb-10 pb-10 border-b border-gray-100">
         <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-xl">
           {post.author?.name?.[0] ?? "A"}
         </div>
         <div>
           <p className="font-semibold text-gray-900 text-lg">{post.author?.name ?? "Admin"}</p>
           <p className="text-gray-500 text-sm">Published Author</p>
         </div>
      </div>
      <div 
        className="prose prose-purple prose-lg max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}
