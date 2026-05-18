import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import ManageBlogs from "../components/admin/ManageBlogs";
import ManageProjects from "../components/admin/ManageProjects";
import ManageUsers from "../components/admin/ManageUsers";
import {
  getActivities,
  getGlobalAnalytics,
  getMemberAnalytics,
  type ActivityItem,
  type AnalyticsSummary,
} from "../services/contentApi";

type StoredUser = {
  name?: string;
  role?: "superadmin" | "admin" | "member";
};

const emptyAnalyticsSummary: AnalyticsSummary = {
  totalEvents: 0,
  byType: {
    page_view: 0,
    project_click: 0,
    user_action: 0,
  },
  projectClicks: [],
  timeline: [],
};

const getStoredUser = (): StoredUser | null => {
  const rawUser = localStorage.getItem("authUser");

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as StoredUser;
  } catch {
    return null;
  }
};

const formatRelativeTime = (input: string): string => {
  const date = new Date(input);
  const diffInMinutes = Math.max(1, Math.round((Date.now() - date.getTime()) / 60000));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.round(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  return `${Math.round(diffInHours / 24)}d ago`;
};

function DashboardHome() {
  const storedUser = getStoredUser();
  const dashboardRole = storedUser?.role ?? "superadmin";
  const [analytics, setAnalytics] = useState<AnalyticsSummary>(emptyAnalyticsSummary);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      try {
        const [analyticsData, activitiesData] = await Promise.all([
          dashboardRole === "member" ? getMemberAnalytics() : getGlobalAnalytics(),
          getActivities(),
        ]);

        if (mounted) {
          setAnalytics(analyticsData);
          setActivities(activitiesData.slice(0, 5));
          setError("");
        }
      } catch (err) {
        if (mounted) {
          const message = err instanceof Error ? err.message : "Failed to load dashboard data";
          setError(message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void loadDashboard();

    return () => {
      mounted = false;
    };
  }, [dashboardRole]);

  const summary = analytics ?? emptyAnalyticsSummary;
  const timelineMax = Math.max(1, ...summary.timeline.map((entry) => entry.count));
  const topProjectClick = summary.projectClicks[0];

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">Dashboard Overview</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Welcome back{storedUser?.name ? `, ${storedUser.name}` : ""}. Showing live {dashboardRole === "member" ? "member" : "global"} analytics and recent activity.
          </p>
        </div>
        <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Create New Project
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {/* Total Events */}
        <div className="bg-surface-container-lowest p-gutter rounded-xl shadow-sm border border-outline-variant flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-secondary-container rounded-lg">
              <span className="material-symbols-outlined text-primary">insights</span>
            </div>
            <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1">Live</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Total Events</p>
            <h3 className="font-headline-md text-headline-md">{loading ? "..." : summary.totalEvents.toLocaleString()}</h3>
          </div>
        </div>

        {/* Page Views */}
        <div className="bg-surface-container-lowest p-gutter rounded-xl shadow-sm border border-outline-variant flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-secondary-container rounded-lg">
              <span className="material-symbols-outlined text-primary">pageview</span>
            </div>
            <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1">Tracked</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Page Views</p>
            <h3 className="font-headline-md text-headline-md">{loading ? "..." : summary.byType.page_view.toLocaleString()}</h3>
          </div>
        </div>

        {/* Project Clicks */}
        <div className="bg-surface-container-lowest p-gutter rounded-xl shadow-sm border border-outline-variant flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-secondary-container rounded-lg">
              <span className="material-symbols-outlined text-primary">ads_click</span>
            </div>
            <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1">Tracked</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Project Clicks</p>
            <h3 className="font-headline-md text-headline-md">{loading ? "..." : summary.byType.project_click.toLocaleString()}</h3>
          </div>
        </div>

        {/* User Actions */}
        <div className="bg-surface-container-lowest p-gutter rounded-xl shadow-sm border border-outline-variant flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-secondary-container rounded-lg">
              <span className="material-symbols-outlined text-primary">manage_accounts</span>
            </div>
            <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1">Tracked</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">User Actions</p>
            <h3 className="font-headline-md text-headline-md">{loading ? "..." : summary.byType.user_action.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Bento Layout Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Chart Area: Visitor Analytics */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden flex flex-col">
          <div className="p-gutter border-b border-outline-variant flex items-center justify-between">
            <div>
              <h4 className="font-headline-sm text-headline-sm">Visitor Analytics</h4>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Daily activity volume over the last available dates</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-surface-container text-outline rounded"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
            </div>
          </div>
          <div className="p-gutter flex-1 flex flex-col justify-end min-h-[350px]">
            {summary.timeline.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-on-surface-variant">
                {loading ? "Loading chart..." : "No analytics available yet."}
              </div>
            ) : (
              <>
                <div className="flex items-end justify-between h-64 gap-2 px-4">
                  {summary.timeline.map((entry) => {
                    const barHeight = Math.max(16, Math.round((entry.count / timelineMax) * 100));

                    return (
                      <div key={entry.date} className="flex-1 bg-primary/10 hover:bg-primary/30 transition-colors rounded-t-lg relative group" style={{ height: `${barHeight}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {entry.count}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-4 text-on-surface-variant font-label-sm text-[10px] uppercase tracking-widest px-4 gap-2">
                  {summary.timeline.map((entry) => (
                    <span key={entry.date} className="flex-1 text-center truncate">
                      {entry.date.slice(5)}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Stats / Insight */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          <div className="bg-primary text-on-primary p-gutter rounded-xl shadow-lg relative overflow-hidden flex-1">
            <div className="relative z-10">
              <h4 className="font-headline-sm text-headline-sm mb-2">Top Project Clicks</h4>
              <p className="font-body-md text-body-md opacity-80 mb-6">
                {topProjectClick ? `${topProjectClick.referenceId} has ${topProjectClick.count} recorded clicks.` : "No project clicks recorded yet."}
              </p>
              <div className="w-full bg-primary-container/30 h-3 rounded-full mb-2">
                <div className="bg-white h-3 rounded-full" style={{ width: `${Math.min(100, summary.byType.project_click * 10)}%` }}></div>
              </div>
              <div className="flex justify-between font-label-sm text-label-sm">
                <span>{summary.byType.project_click} clicks</span>
                <span>{dashboardRole}</span>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-20 transform rotate-12">
              <span className="material-symbols-outlined text-[160px]">auto_graph</span>
            </div>
          </div>
          <div className="bg-surface-container-highest p-gutter rounded-xl border border-outline-variant flex flex-col gap-4">
            <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Dashboard Scope</h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center border border-outline-variant">
                <span className="material-symbols-outlined text-primary">verified_user</span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface">{dashboardRole === "member" ? "Member analytics" : "Global analytics"}</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  {dashboardRole === "member" ? "Limited to your own projects" : "Includes the full workspace"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
        <div className="p-gutter border-b border-outline-variant flex items-center justify-between">
          <h4 className="font-headline-sm text-headline-sm">Recent Activities</h4>
          <button className="text-primary font-label-md text-label-md hover:underline">Live feed</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-bright border-b border-outline-variant">
                <th className="px-gutter py-4 font-label-sm text-label-sm text-on-surface-variant">User</th>
                <th className="px-gutter py-4 font-label-sm text-label-sm text-on-surface-variant">Action</th>
                <th className="px-gutter py-4 font-label-sm text-label-sm text-on-surface-variant">Target</th>
                <th className="px-gutter py-4 font-label-sm text-label-sm text-on-surface-variant">Date</th>
                <th className="px-gutter py-4 font-label-sm text-label-sm text-on-surface-variant"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {activities.length === 0 ? (
                <tr>
                  <td className="px-gutter py-4 text-on-surface-variant" colSpan={5}>
                    {loading ? "Loading activities..." : "No recent activity yet."}
                  </td>
                </tr>
              ) : (
                activities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-surface-bright transition-colors">
                    <td className="px-gutter py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-[12px]">
                          {activity.user?.name?.slice(0, 2).toUpperCase() ?? "SY"}
                        </div>
                        <span className="font-body-md text-body-md font-medium">{activity.user?.name ?? "System"}</span>
                      </div>
                    </td>
                    <td className="px-gutter py-4">
                      <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full font-label-sm text-label-sm border border-amber-100">
                        {activity.type.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-gutter py-4">
                      <span className="font-body-md text-body-md text-on-surface">{activity.actionDetail}</span>
                    </td>
                    <td className="px-gutter py-4">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">{formatRelativeTime(activity.createdAt)}</span>
                    </td>
                    <td className="px-gutter py-4 text-right">
                      <button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {error && <div className="px-gutter py-4 text-sm text-red-600 border-t border-outline-variant">{error}</div>}
      </div>
    </>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const currentPath = location.pathname;

  return (
    <div className="text-on-surface bg-background">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-screen w-sidebar-width z-40 hidden md:flex flex-col bg-surface-container-lowest border-r border-outline-variant shadow-sm">
        <div className="px-gutter py-stack-lg">
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">CorpAdmin</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant">Enterprise Portal</p>
        </div>
        <nav className="flex flex-col gap-stack-sm py-gutter px-2 flex-1">
          <Link
            to="/dashboard"
            className={`flex items-center px-4 py-3 gap-3 font-label-md text-label-md transition-all cursor-pointer active:scale-[0.98] ${
              currentPath === "/dashboard"
                ? "bg-secondary-container text-primary border-l-4 border-primary"
                : "text-secondary hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>
          <Link
            to="/dashboard/projects"
            className={`flex items-center px-4 py-3 gap-3 font-label-md text-label-md transition-all cursor-pointer active:scale-[0.98] ${
              currentPath === "/dashboard/projects"
                ? "bg-secondary-container text-primary border-l-4 border-primary"
                : "text-secondary hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined">assignment</span>
            Manage Projects
          </Link>
          <Link
            to="/dashboard/blogs"
            className={`flex items-center px-4 py-3 gap-3 font-label-md text-label-md transition-all cursor-pointer active:scale-[0.98] ${
              currentPath === "/dashboard/blogs"
                ? "bg-secondary-container text-primary border-l-4 border-primary"
                : "text-secondary hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined">edit_note</span>
            Manage Blogs
          </Link>
          <Link
            to="/dashboard/users"
            className={`flex items-center px-4 py-3 gap-3 font-label-md text-label-md transition-all cursor-pointer active:scale-[0.98] ${
              currentPath === "/dashboard/users"
                ? "bg-secondary-container text-primary border-l-4 border-primary"
                : "text-secondary hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined">group</span>
            Manage Users
          </Link>
          <button
            onClick={handleLogout}
            className="text-error hover:bg-error-container mt-auto flex items-center px-4 py-3 gap-3 font-label-md text-label-md transition-colors duration-200 cursor-pointer active:scale-[0.98] text-left"
          >
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </nav>
      </aside>

      {/* TopNavBar */}
      <header className="fixed top-0 right-0 w-full md:w-[calc(100%-280px)] h-16 z-30 bg-surface-bright border-b border-outline-variant flex justify-between items-center px-gutter">
        <div className="flex items-center gap-4 flex-1">
          <span className="md:hidden font-headline-sm text-headline-sm font-bold text-primary">CorpAdmin</span>
          <div className="relative w-full max-w-md hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-2 pl-10 pr-4 font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="Search data..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-stack-md">
          <button className="p-2 hover:bg-surface-container-high rounded-full transition-all active:opacity-80">
            <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
          </button>
          <button className="p-2 hover:bg-surface-container-high rounded-full transition-all active:opacity-80">
            <span className="material-symbols-outlined text-on-surface-variant">settings</span>
          </button>
          <div className="flex items-center gap-3 pl-2 ml-2 border-l border-outline-variant">
            <div className="text-right hidden sm:block">
              <p className="font-label-md text-label-md text-on-surface">{getStoredUser()?.name ?? "Superadmin"}</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">{getStoredUser()?.role ?? "System Master"}</p>
            </div>
            <img
              alt="Superadmin Avatar"
              className="w-10 h-10 rounded-full object-cover border border-outline-variant"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3krDeQrYocmIcqaasgC68eAph7AMxr8gMm_KqPrQJVYsBcDgXu0g0_rayt4TlFsDZeOBRtB887P5Fgbj4ySH609X85mjZ26bUMo_cbTJhOva0n8FDbAoPkvZJuPMe1nnWGzQfU5y9tPWF6xGBp_IZcrUKE4LJvrm8F6X8OD5aova8KC9DNW9yM0_vtjuJhWxr58-wGGKPqGMla_k_tkNN5oDntpk2yatj0b0CkiRJxG1RhzV3uK8258KXQ6VOId0oP46_MVOJIj8"
            />
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="pt-16 md:ml-[280px] min-h-screen">
        <div className="p-container-padding max-w-[1600px] mx-auto flex flex-col gap-stack-lg">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="blogs" element={<ManageBlogs />} />
            <Route path="users" element={<ManageUsers />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
