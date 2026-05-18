import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  type ProjectItem,
} from "../../services/contentApi";

const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (error.response?.data as { message?: string } | undefined)?.message ?? "Failed to perform action";
  }
  return "Failed to perform action";
};

type FormData = {
  title: string;
  description: string;
  imageLink: string;
  projectLink: string;
};

const initialFormData: FormData = {
  title: "",
  description: "",
  imageLink: "",
  projectLink: "",
};

export default function ManageProjects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  // Form states
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  // Action states
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [actionLoading, setActionLoading] = useState<string>("");

  // Load projects
  useEffect(() => {
    let mounted = true;

    const loadProjects = async () => {
      try {
        const data = await getProjects();
        if (mounted) {
          setProjects(data);
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

    void loadProjects();
    return () => {
      mounted = false;
    };
  }, []);

  // Validate form
  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};

    if (!formData.title.trim() || formData.title.trim().length < 2) {
      errors.title = "Title must be at least 2 characters";
    }

    if (!formData.description.trim() || formData.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters";
    }

    if (!formData.imageLink.trim()) {
      errors.imageLink = "Image link is required";
    } else {
      try {
        new URL(formData.imageLink.trim());
      } catch {
        errors.imageLink = "Invalid URL format";
      }
    }

    if (!formData.projectLink.trim()) {
      errors.projectLink = "Project link is required";
    } else {
      try {
        new URL(formData.projectLink.trim());
      } catch {
        errors.projectLink = "Invalid URL format";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle create
  const handleCreateClick = () => {
    setFormData(initialFormData);
    setFormErrors({});
    setFormError("");
    setShowCreateModal(true);
  };

  const handleCreateSubmit = async () => {
    if (!validateForm()) return;

    setFormLoading(true);
    setFormError("");

    try {
      const newProject = await createProject(formData);
      setProjects([...projects, newProject]);
      setShowCreateModal(false);
      setFormData(initialFormData);
    } catch (err) {
      setFormError(extractErrorMessage(err));
    } finally {
      setFormLoading(false);
    }
  };

  // Handle edit
  const handleEditClick = (project: ProjectItem) => {
    setSelectedProjectId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      imageLink: project.imageLink,
      projectLink: project.projectLink,
    });
    setFormErrors({});
    setFormError("");
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    if (!validateForm()) return;

    setFormLoading(true);
    setFormError("");

    try {
      const updatedProject = await updateProject(selectedProjectId, formData);
      setProjects(projects.map((p) => (p.id === selectedProjectId ? updatedProject : p)));
      setShowEditModal(false);
      setFormData(initialFormData);
      setSelectedProjectId("");
    } catch (err) {
      setFormError(extractErrorMessage(err));
    } finally {
      setFormLoading(false);
    }
  };

  // Handle delete
  const handleDeleteClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setActionLoading(selectedProjectId);

    try {
      await deleteProject(selectedProjectId);
      setProjects(projects.filter((p) => p.id !== selectedProjectId));
      setShowDeleteModal(false);
      setSelectedProjectId("");
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setActionLoading("");
    }
  };

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Projects</h1>
        <button
          onClick={handleCreateClick}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors shadow-sm"
        >
          + Create New Project
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50 text-sm font-semibold text-gray-600">
          <div className="col-span-5">Project Details</div>
          <div className="col-span-4">Status/Likes</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>
        <div className="divide-y divide-gray-100">
          {loading && <div className="p-4 text-gray-500">Loading projects...</div>}
          {error && !loading && <div className="p-4 text-red-600">{error}</div>}
          {!loading && !error && projects.length === 0 && <div className="p-4 text-gray-500">No project data yet.</div>}
          {projects.map((p) => (
            <div key={p.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-5">
                <div className="font-semibold text-gray-900">{p.title}</div>
                <div className="text-sm text-gray-500 truncate mt-1">{p.description}</div>
              </div>
              <div className="col-span-4 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <span className="text-pink-500">♥</span> {p.likes} likes
                </span>
              </div>
              <div className="col-span-3 flex justify-end gap-2">
                <button
                  onClick={() => handleEditClick(p)}
                  className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(p.id)}
                  disabled={actionLoading === p.id}
                  className="px-4 py-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading === p.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Create New Project</h2>
            </div>

            <div className="p-6 space-y-4">
              {formError && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{formError}</div>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    formErrors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Project title"
                />
                {formErrors.title && <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleFormChange("description", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                    formErrors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Project description (min 10 characters)"
                  rows={3}
                />
                {formErrors.description && <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Link</label>
                <input
                  type="text"
                  value={formData.imageLink}
                  onChange={(e) => handleFormChange("imageLink", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    formErrors.imageLink ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
                {formErrors.imageLink && <p className="mt-1 text-sm text-red-600">{formErrors.imageLink}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
                <input
                  type="text"
                  value={formData.projectLink}
                  onChange={(e) => handleFormChange("projectLink", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    formErrors.projectLink ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="https://example.com/project"
                />
                {formErrors.projectLink && <p className="mt-1 text-sm text-red-600">{formErrors.projectLink}</p>}
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

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Edit Project</h2>
            </div>

            <div className="p-6 space-y-4">
              {formError && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{formError}</div>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    formErrors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Project title"
                />
                {formErrors.title && <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleFormChange("description", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                    formErrors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Project description (min 10 characters)"
                  rows={3}
                />
                {formErrors.description && <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Link</label>
                <input
                  type="text"
                  value={formData.imageLink}
                  onChange={(e) => handleFormChange("imageLink", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    formErrors.imageLink ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
                {formErrors.imageLink && <p className="mt-1 text-sm text-red-600">{formErrors.imageLink}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
                <input
                  type="text"
                  value={formData.projectLink}
                  onChange={(e) => handleFormChange("projectLink", e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    formErrors.projectLink ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="https://example.com/project"
                />
                {formErrors.projectLink && <p className="mt-1 text-sm text-red-600">{formErrors.projectLink}</p>}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Delete Project?</h2>
            </div>

            <div className="p-6">
              <p className="text-gray-600">Are you sure you want to delete this project? This action cannot be undone.</p>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedProjectId("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={actionLoading === selectedProjectId}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading === selectedProjectId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
