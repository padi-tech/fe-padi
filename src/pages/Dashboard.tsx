import React from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import ManageBlogs from "../components/admin/ManageBlogs";
import ManageProjects from "../components/admin/ManageProjects";

function DashboardHome() {
  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">Dashboard Overview</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Welcome back. Here is what's happening with your projects today.</p>
        </div>
        <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Create New Project
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {/* Total Visitors */}
        <div className="bg-surface-container-lowest p-gutter rounded-xl shadow-sm border border-outline-variant flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-secondary-container rounded-lg">
              <span className="material-symbols-outlined text-primary">group</span>
            </div>
            <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +5%
            </span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Total Visitors</p>
            <h3 className="font-headline-md text-headline-md">12.5k</h3>
          </div>
        </div>

        {/* Total Projects */}
        <div className="bg-surface-container-lowest p-gutter rounded-xl shadow-sm border border-outline-variant flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-secondary-container rounded-lg">
              <span className="material-symbols-outlined text-primary">assignment</span>
            </div>
            <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +12%
            </span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Total Projects</p>
            <h3 className="font-headline-md text-headline-md">48</h3>
          </div>
        </div>

        {/* Total Blogs */}
        <div className="bg-surface-container-lowest p-gutter rounded-xl shadow-sm border border-outline-variant flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-secondary-container rounded-lg">
              <span className="material-symbols-outlined text-primary">edit_note</span>
            </div>
            <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">horizontal_rule</span> 0%
            </span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Total Blogs</p>
            <h3 className="font-headline-md text-headline-md">156</h3>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-surface-container-lowest p-gutter rounded-xl shadow-sm border border-outline-variant flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-secondary-container rounded-lg">
              <span className="material-symbols-outlined text-primary">bolt</span>
            </div>
            <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +3.2%
            </span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Active Users</p>
            <h3 className="font-headline-md text-headline-md">1.2k</h3>
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
              <p className="font-label-sm text-label-sm text-on-surface-variant">Daily unique visitors over the last 14 days</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-surface-container text-outline rounded"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
            </div>
          </div>
          <div className="p-gutter flex-1 flex flex-col justify-end min-h-[350px]">
            <div className="flex items-end justify-between h-64 gap-2 px-4">
              {/* Stylized Bar Chart using Tailwind */}
              <div className="flex-1 bg-primary/10 hover:bg-primary/30 transition-colors rounded-t-lg relative group h-[40%]"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">420</div></div>
              <div className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-lg relative group h-[60%]"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">680</div></div>
              <div className="flex-1 bg-primary/10 hover:bg-primary/30 transition-colors rounded-t-lg relative group h-[30%]"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">310</div></div>
              <div className="flex-1 bg-primary/40 hover:bg-primary/60 transition-colors rounded-t-lg relative group h-[85%]"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">940</div></div>
              <div className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-lg relative group h-[50%]"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">550</div></div>
              <div className="flex-1 bg-primary/60 hover:bg-primary/80 transition-colors rounded-t-lg relative group h-[95%]"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">1.1k</div></div>
              <div className="flex-1 bg-primary/30 hover:bg-primary/50 transition-colors rounded-t-lg relative group h-[70%]"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">790</div></div>
              <div className="flex-1 bg-primary/10 hover:bg-primary/30 transition-colors rounded-t-lg relative group h-[45%]"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">480</div></div>
              <div className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-lg relative group h-[65%]"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">710</div></div>
              <div className="flex-1 bg-primary/80 hover:bg-primary transition-colors rounded-t-lg relative group h-[100%]"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">1.2k</div></div>
              <div className="flex-1 bg-primary/40 hover:bg-primary/60 transition-colors rounded-t-lg relative group h-[75%]"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">860</div></div>
              <div className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-lg relative group h-[55%]"><div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">600</div></div>
            </div>
            <div className="flex justify-between mt-4 text-on-surface-variant font-label-sm text-[10px] uppercase tracking-widest px-4">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
            </div>
          </div>
        </div>

        {/* Quick Stats / Insight */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          <div className="bg-primary text-on-primary p-gutter rounded-xl shadow-lg relative overflow-hidden flex-1">
            <div className="relative z-10">
              <h4 className="font-headline-sm text-headline-sm mb-2">Growth Target</h4>
              <p className="font-body-md text-body-md opacity-80 mb-6">You've reached 85% of your monthly goal for new blog posts. Almost there!</p>
              <div className="w-full bg-primary-container/30 h-3 rounded-full mb-2">
                <div className="bg-white h-3 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="flex justify-between font-label-sm text-label-sm">
                <span>132 / 156 Blogs</span>
                <span>85%</span>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-20 transform rotate-12">
              <span className="material-symbols-outlined text-[160px]">auto_graph</span>
            </div>
          </div>
          <div className="bg-surface-container-highest p-gutter rounded-xl border border-outline-variant flex flex-col gap-4">
            <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Top Performing Blog</h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center border border-outline-variant">
                <span className="material-symbols-outlined text-primary">article</span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface">The Future of AI in Fintech</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">4.2k views this week</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
        <div className="p-gutter border-b border-outline-variant flex items-center justify-between">
          <h4 className="font-headline-sm text-headline-sm">Recent Activities</h4>
          <button className="text-primary font-label-md text-label-md hover:underline">View All Activities</button>
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
              <tr className="hover:bg-surface-bright transition-colors">
                <td className="px-gutter py-4">
                  <div className="flex items-center gap-3">
                    <img className="w-8 h-8 rounded-full object-cover" alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjt7jMdVORGeQhfXKUq-vBE0hMWCljZRBX3EH8Juu_HSinRMPnmITjYuBUpXq22qV25WVOXkuzR-mH_VnQ4DrPaUSKVTgjCOOB364jWrfANQsYBmVUq5yQhcyZqvzz0o12Wtd5Ht5c8qj9ImoZpX9c9uVqBPM29qT4ll95Z46sz9PE7nCd6WsWBcRfRfUSLrjLdTEAd1A0kxGLbbYNPKgekcoNtL4EX2tJqDDHI7f-eaKOiVszIubrSWI1AQNpavgSt0ORkUFmVv8"/>
                    <span className="font-body-md text-body-md font-medium">Jane Doe</span>
                  </div>
                </td>
                <td className="px-gutter py-4">
                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-label-sm text-label-sm border border-emerald-100">Created</span>
                </td>
                <td className="px-gutter py-4">
                  <span className="font-body-md text-body-md text-on-surface">Project Phoenix</span>
                </td>
                <td className="px-gutter py-4">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">2 hours ago</span>
                </td>
                <td className="px-gutter py-4 text-right">
                  <button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-surface-bright transition-colors">
                <td className="px-gutter py-4">
                  <div className="flex items-center gap-3">
                    <img className="w-8 h-8 rounded-full object-cover" alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2UeWik7RHIwcf5ac4T4RglbLOA-FU22biMm0eE6J-eH-ixUuqqyvUL2lqHTK8ZtV28gb2YodJzju6tqjWVlfqFGIT0dQLurr2pXEfWuFtbDF1NjrqyEpBsTlH405W3p5B6K6A5PyaSSNcAXCTgJYsS2Amv8rnWzcEULu4TToUIQX6W8zQ2JeQz2qaQvPrpGloM2VG7jbvTkzsm4DZXP473ShKGGH2P3AtZqxNklEpUtVWIdYTTEUxOn7lj6cBPPhH57SiV873Ens"/>
                    <span className="font-body-md text-body-md font-medium">John Smith</span>
                  </div>
                </td>
                <td className="px-gutter py-4">
                  <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full font-label-sm text-label-sm border border-amber-100">Edited</span>
                </td>
                <td className="px-gutter py-4">
                  <span className="font-body-md text-body-md text-on-surface">Blog: AI Trends</span>
                </td>
                <td className="px-gutter py-4">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">5 hours ago</span>
                </td>
                <td className="px-gutter py-4 text-right">
                  <button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-surface-bright transition-colors">
                <td className="px-gutter py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-[12px]">RW</div>
                    <span className="font-body-md text-body-md font-medium">Robert White</span>
                  </div>
                </td>
                <td className="px-gutter py-4">
                  <span className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full font-label-sm text-label-sm border border-rose-100">Deleted</span>
                </td>
                <td className="px-gutter py-4">
                  <span className="font-body-md text-body-md text-on-surface">Old Archive 2023</span>
                </td>
                <td className="px-gutter py-4">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">1 day ago</span>
                </td>
                <td className="px-gutter py-4 text-right">
                  <button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
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
              <p className="font-label-md text-label-md text-on-surface">Superadmin</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">System Master</p>
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
          </Routes>
        </div>
      </main>
    </div>
  );
}
