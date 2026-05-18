import React, { useEffect, useState } from "react";
import axios from "axios";
import { createBlog, deleteBlog, getBlogs, updateBlog, type BlogItem } from "../../services/contentApi";

const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (error.response?.data as { message?: string } | undefined)?.message ?? "Failed to perform action";
  }

  return "Failed to perform action";
};

type FormState = {
  title: string;
  content: string;
  thumbnail: string;
};

type UserRole = "superadmin" | "admin" | "member";

const getCurrentRole = (): UserRole | null => {
  const rawUser = localStorage.getItem("authUser");

  if (!rawUser) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawUser) as { role?: UserRole };
    return parsed.role ?? null;
  } catch {
    return null;
  }
};

const initialFormState: FormState = {
  title: "",
  content: "",
  thumbnail: "",
};

export default function ManageBlogs() {
  const currentRole = getCurrentRole();
  const canManageBlogs = currentRole === "superadmin" || currentRole === "admin";
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string>("");
  const [actionLoading, setActionLoading] = useState<string>("");
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [formErrors, setFormErrors] = useState<Partial<FormState>>({});
  const [formError, setFormError] = useState<string>("");
  const [formLoading, setFormLoading] = useState<boolean>(false);

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

  const validateForm = (): boolean => {
    const nextErrors: Partial<FormState> = {};

    if (formData.title.trim().length < 2) {
      nextErrors.title = "Title must be at least 2 characters";
    }

    if (formData.content.trim().length < 20) {
      nextErrors.content = "Content must be at least 20 characters";
    }

    if (!formData.thumbnail.trim()) {
      nextErrors.thumbnail = "Thumbnail URL is required";
    } else {
      try {
        new URL(formData.thumbnail.trim());
      } catch {
        nextErrors.thumbnail = "Thumbnail must be a valid URL";
      }
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const openCreateModal = () => {
    if (!canManageBlogs) {
      setError("Only admin or superadmin can create blogs.");
      return;
    }

    setFormData(initialFormState);
    setFormErrors({});
    setFormError("");
    setShowCreateModal(true);
  };

  const openEditModal = (blog: BlogItem) => {
    if (!canManageBlogs) {
      setError("Only admin or superadmin can update blogs.");
      return;
    }

    setSelectedBlogId(blog.id);
    setFormData({
      title: blog.title,
      content: blog.content,
      thumbnail: blog.thumbnail,
    });
    setFormErrors({});
    setFormError("");
    setShowEditModal(true);
  };

  const handleCreateSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setFormLoading(true);
    setFormError("");

    try {
      const newBlog = await createBlog(window.crypto.randomUUID(), formData);
      setBlogs((prev) => [newBlog, ...prev]);
      setShowCreateModal(false);
      setFormData(initialFormState);
    } catch (err) {
      setFormError(extractErrorMessage(err));
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setFormLoading(true);
    setFormError("");

    try {
      const updatedBlog = await updateBlog(selectedBlogId, formData);
      setBlogs((prev) => prev.map((blog) => (blog.id === selectedBlogId ? updatedBlog : blog)));
      setShowEditModal(false);
      setSelectedBlogId("");
      setFormData(initialFormState);
    } catch (err) {
      setFormError(extractErrorMessage(err));
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteClick = (blogId: string) => {
    if (!canManageBlogs) {
      setError("Only admin or superadmin can delete blogs.");
      return;
    }

    setSelectedBlogId(blogId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setActionLoading(selectedBlogId);

    try {
      await deleteBlog(selectedBlogId);
      setBlogs((prev) => prev.filter((blog) => blog.id !== selectedBlogId));
      setShowDeleteModal(false);
      setSelectedBlogId("");
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setActionLoading("");
    }
  };

  const handleFormChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Blogs</h1>
        <button
          onClick={openCreateModal}
          disabled={!canManageBlogs}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors shadow-sm"
        >
          + Create New Blog
        </button>
      </div>

      {!canManageBlogs && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg text-sm">
          You can view blogs, but only admin/superadmin can create, edit, or delete.
        </div>
      )}

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50 text-sm font-semibold text-gray-600">
          <div className="col-span-5">Blog Details</div>
          <div className="col-span-4">Author</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>
        <div className="divide-y divide-gray-100">
          {loading && <div className="p-4 text-gray-500">Loading blogs...</div>}
          {error && !loading && <div className="p-4 text-red-600">{error}</div>}
          {!loading && !error && blogs.length === 0 && <div className="p-4 text-gray-500">No blog data yet.</div>}
          {blogs.map((blog) => (
            <div key={blog.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-5">
                <div className="font-semibold text-gray-900">{blog.title}</div>
                <div className="text-sm text-gray-500 truncate mt-1">{blog.content.replace(/<[^>]*>/g, "").slice(0, 120)}</div>
              </div>
              <div className="col-span-4 text-sm text-gray-500">{blog.author?.name ?? "Admin"}</div>
              <div className="col-span-3 flex justify-end gap-2">
                <button
                  onClick={() => openEditModal(blog)}
                  disabled={!canManageBlogs}
                  className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(blog.id)}
                  disabled={!canManageBlogs || actionLoading === blog.id}
                  className="px-4 py-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading === blog.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Create New Blog</h2>
            </div>

            <div className="p-6 space-y-4">
              {formError && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{formError}</div>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  value={formData.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    formErrors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Blog title"
                />
                {formErrors.title && <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleFormChange("content", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y min-h-40 ${
                    formErrors.content ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Blog content"
                  rows={8}
                />
                {formErrors.content && <p className="mt-1 text-sm text-red-600">{formErrors.content}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                <input
                  value={formData.thumbnail}
                  onChange={(e) => handleFormChange("thumbnail", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    formErrors.thumbnail ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="https://example.com/thumbnail.jpg"
                />
                {formErrors.thumbnail && <p className="mt-1 text-sm text-red-600">{formErrors.thumbnail}</p>}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSubmit}
                disabled={formLoading}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formLoading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Edit Blog</h2>
            </div>

            <div className="p-6 space-y-4">
              {formError && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{formError}</div>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  value={formData.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    formErrors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Blog title"
                />
                {formErrors.title && <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleFormChange("content", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y min-h-40 ${
                    formErrors.content ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Blog content"
                  rows={8}
                />
                {formErrors.content && <p className="mt-1 text-sm text-red-600">{formErrors.content}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                <input
                  value={formData.thumbnail}
                  onChange={(e) => handleFormChange("thumbnail", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    formErrors.thumbnail ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="https://example.com/thumbnail.jpg"
                />
                {formErrors.thumbnail && <p className="mt-1 text-sm text-red-600">{formErrors.thumbnail}</p>}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                disabled={formLoading}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Delete Blog?</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Are you sure you want to delete this blog post? This action cannot be undone.</p>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedBlogId("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={actionLoading === selectedBlogId}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading === selectedBlogId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
