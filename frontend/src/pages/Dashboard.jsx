import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import API from "../api/axios";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "User",
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState([
    { title: "Total Tasks", value: 0 },
    { title: "In Progress", value: 0 },
    { title: "Completed", value: 0 },
    { title: "Overdue", value: 0 },
  ]);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsRes = await API.get("/dashboard/stats");
        const tasksRes = await API.get("/tasks");

        const dashboardStats = statsRes.data;
        const allTasks = tasksRes.data.tasks || [];

        setStats([
          { title: "Total Tasks", value: dashboardStats.totalTasks || 0 },
          {
            title: "In Progress",
            value: dashboardStats.inProgressTasks || 0,
          },
          {
            title: "Completed",
            value: dashboardStats.completedTasks || 0,
          },
          { title: "Overdue", value: dashboardStats.overdueTasks || 0 },
        ]);

        setTasks(allTasks.slice(0, 4));
      } catch (err) {
        console.log("Dashboard fetch error:", err);
      }
    };

    fetchDashboardData();
  }, []);

  const menuItems = ["Home", "Dashboard", "Projects", "My Tasks"];

  const getRoute = (item) => {
    switch (item) {
      case "Home":
        return "/";
      case "Projects":
        return "/projects";
      case "My Tasks":
        return "/my-tasks";
      default:
        return "/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[80px_80px] opacity-30" />

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-75 sm:w-175 h-75 sm:h-175 bg-cyan-500/10 blur-[120px]" />

      <div className="relative flex">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-5 left-5 z-50 p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10"
        >
          <Menu size={24} />
        </button>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link
              to="/"
              className="flex items-center gap-3"
              onClick={() => setSidebarOpen(false)}
            >
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold">
                T
              </div>

              <span className="text-2xl font-semibold">TeamTask</span>
            </Link>

            <button onClick={() => setSidebarOpen(false)}>
              <X size={30} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="p-6 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item}
                to={getRoute(item)}
                onClick={() => setSidebarOpen(false)}
                className="block text-lg px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 min-h-screen border-r border-white/10 bg-transparent backdrop-blur-2xl p-6">
          <Link to="/" className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold">
              T
            </div>

            <span className="text-2xl font-semibold">TeamTask</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item}
                to={getRoute(item)}
                className="block px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition"
              >
                {item}
              </Link>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full p-4 sm:p-6 lg:p-10 pt-24 lg:pt-10">
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
            <div>
              <p className="text-white/50">Welcome back,</p>

              <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
                {user.name}
              </h1>
            </div>

            <Link
              to="/projects"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition"
            >
              View Projects
            </Link>
          </header>

          {/* Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-6"
              >
                <p className="text-white/50 text-sm">{stat.title}</p>

                <h2 className="text-4xl font-semibold mt-3">
                  {stat.value}
                </h2>
              </div>
            ))}
          </section>

          {/* Main Content Sections */}
          <section className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.8fr] gap-6 mt-8">
            {/* Recent Tasks */}
            <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden">
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Tasks</h2>

                <Link
                  to="/my-tasks"
                  className="text-sm text-white/50 hover:text-white"
                >
                  View all
                </Link>
              </div>

              <div className="divide-y divide-white/10">
                {tasks.length === 0 ? (
                  <p className="p-5 text-white/50">No tasks found</p>
                ) : (
                  tasks.map((task) => (
                    <div
                      key={task._id}
                      className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-white/5 transition"
                    >
                      <div>
                        <h3 className="font-medium">{task.title}</h3>

                        <p className="text-sm text-white/50 mt-1">
                          {task.project?.name || "No Project"}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5">
                          {task.status}
                        </span>

                        <span className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5">
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Task Overview */}
            <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-6">
              <h2 className="text-xl font-semibold mb-6">
                Task Overview
              </h2>

              <div className="space-y-5">
                {stats.slice(1, 3).map((stat) => (
                  <div key={stat.title}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/60">
                        {stat.title}
                      </span>

                      <span>{stat.value}</span>
                    </div>

                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{
                          width: `${
                            stats[0].value
                              ? (stat.value / stats[0].value) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border border-white/10 rounded-2xl p-5 bg-white/5">
                <p className="text-white/50 text-sm">
                  Current Focus
                </p>

                <h3 className="text-2xl font-semibold mt-2">
                  Backend API Integration
                </h3>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;