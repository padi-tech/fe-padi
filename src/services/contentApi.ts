import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000",
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  imageLink: string;
  projectLink: string;
  likes: number;
}

export interface BlogItem {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  author: {
    id: string;
    name: string;
  };
}

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: "superadmin" | "admin" | "member";
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: UserItem;
}

export interface AnalyticsSummary {
  totalEvents: number;
  byType: {
    page_view: number;
    project_click: number;
    user_action: number;
  };
  projectClicks: Array<{ referenceId: string; count: number }>;
  timeline: Array<{ date: string; count: number }>;
}

export interface ActivityItem {
  id: string;
  type: "page_view" | "project_click" | "user_action";
  referenceId: string | null;
  userId: string | null;
  actionDetail: string;
  createdAt: string;
  user?: UserItem | null;
}

export const getProjects = async (): Promise<ProjectItem[]> => {
  const response = await api.get<ApiEnvelope<{ projects: ProjectItem[] }>>("/api/projects");
  return response.data.data.projects;
};

export const createProject = async (data: {
  title: string;
  description: string;
  imageLink: string;
  projectLink: string;
}): Promise<ProjectItem> => {
  const response = await api.post<ApiEnvelope<{ project: ProjectItem }>>("/api/projects", data);
  return response.data.data.project;
};

export const updateProject = async (
  id: string,
  data: Partial<{
    title: string;
    description: string;
    imageLink: string;
    projectLink: string;
  }>
): Promise<ProjectItem> => {
  const response = await api.put<ApiEnvelope<{ project: ProjectItem }>>(`/api/projects/${id}`, data);
  return response.data.data.project;
};

export const deleteProject = async (id: string): Promise<ProjectItem> => {
  const response = await api.delete<ApiEnvelope<{ project: ProjectItem }>>(`/api/projects/${id}`);
  return response.data.data.project;
};

export const likeProject = async (id: string): Promise<ProjectItem> => {
  const response = await api.post<ApiEnvelope<{ project: ProjectItem }>>(`/api/projects/${id}/like`);
  return response.data.data.project;
};

export const recordProjectClick = async (id: string): Promise<ProjectItem> => {
  const response = await api.post<ApiEnvelope<{ project: ProjectItem }>>(`/api/projects/${id}/click`);
  return response.data.data.project;
};

export const getBlogs = async (): Promise<BlogItem[]> => {
  const response = await api.get<ApiEnvelope<{ blogs: BlogItem[] }>>("/api/blogs");
  return response.data.data.blogs;
};

export const getBlogById = async (id: string): Promise<BlogItem> => {
  const response = await api.get<ApiEnvelope<{ blog: BlogItem }>>(`/api/blogs/${id}`);
  return response.data.data.blog;
};

export const createBlog = async (
  id: string,
  data: {
    title: string;
    content: string;
    thumbnail: string;
  }
): Promise<BlogItem> => {
  const response = await api.post<ApiEnvelope<{ blog: BlogItem }>>(`/api/blogs/${id}`, data);
  return response.data.data.blog;
};

export const updateBlog = async (
  id: string,
  data: Partial<{
    title: string;
    content: string;
    thumbnail: string;
  }>
): Promise<BlogItem> => {
  const response = await api.put<ApiEnvelope<{ blog: BlogItem }>>(`/api/blogs/${id}`, data);
  return response.data.data.blog;
};

export const deleteBlog = async (id: string): Promise<BlogItem> => {
  const response = await api.delete<ApiEnvelope<{ blog: BlogItem }>>(`/api/blogs/${id}`);
  return response.data.data.blog;
};

export const registerAccount = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await api.post<ApiEnvelope<AuthResponse>>("/api/auth/register", data);
  return response.data.data;
};

export const getGlobalAnalytics = async (): Promise<AnalyticsSummary> => {
  const response = await api.get<ApiEnvelope<{ analytics: AnalyticsSummary }>>("/api/analytics/global");
  return response.data.data.analytics;
};

export const getMemberAnalytics = async (): Promise<AnalyticsSummary> => {
  const response = await api.get<ApiEnvelope<{ analytics: AnalyticsSummary }>>("/api/analytics/member");
  return response.data.data.analytics;
};

export const getActivities = async (): Promise<ActivityItem[]> => {
  const response = await api.get<ApiEnvelope<{ activities: ActivityItem[] }>>("/api/activities");
  return response.data.data.activities;
};

export const getMe = async (): Promise<UserItem> => {
  const response = await api.get<ApiEnvelope<{ user: UserItem }>>("/api/users/me");
  return response.data.data.user;
};

export const getUsers = async (): Promise<UserItem[]> => {
  const response = await api.get<ApiEnvelope<{ users: UserItem[] }>>("/api/users");
  return response.data.data.users;
};

export const getUserById = async (id: string): Promise<UserItem> => {
  const response = await api.get<ApiEnvelope<{ user: UserItem }>>(`/api/users/${id}`);
  return response.data.data.user;
};

export const updateUserRole = async (
  id: string,
  role: "superadmin" | "admin" | "member"
): Promise<UserItem> => {
  const response = await api.patch<ApiEnvelope<{ user: UserItem }>>(`/api/users/${id}/role`, {
    role,
  });
  return response.data.data.user;
};

export const deleteUser = async (id: string): Promise<UserItem> => {
  const response = await api.delete<ApiEnvelope<{ user: UserItem }>>(`/api/users/${id}`);
  return response.data.data.user;
};
