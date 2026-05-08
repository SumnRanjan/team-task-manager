import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Suman" };
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState([
    { title: "Total Tasks", value: 0 },
    { title: "In Progress", value: 0 },
    { title: "Completed", value: 0 },
    { title: "Overdue", value: 0 },
  ]);

  const [tasks, setTasks] = useState([]);

  const API_URL = "http://localhost:5000/api";
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`${API_URL}/tasks/my-tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allTasks = Array.isArray(res.data) ? res.data : [];

        const total = allTasks.length;

        const inProgress = allTasks.filter(
          (task) => task.status === "In Progress",
        ).length;

        const completed = allTasks.filter(
          (task) => task.status === "Done" || task.status === "Completed",
        ).length;

        const overdue = allTasks.filter(
          (task) => task.due_date && new Date(task.due_date) < new Date(),
        ).length;

        setStats([
          { title: "Total Tasks", value: total },
          { title: "In Progress", value: inProgress },
          { title: "Completed", value: completed },
          { title: "Overdue", value: overdue },
        ]);

        setTasks(allTasks.slice(0, 4));
      } catch (err) {
        console.log("Dashboard fetch error:", err);
      }
    };

    fetchDashboardData();
  }, [API_URL, token]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[80px_80px] opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-75 sm:w-175 h-75 sm:h-175 bg-cyan-500/10 blur-[120px]" />

      <div className="relative flex">
        <aside className="hidden lg:block w-72 min-h-screen border-r border-white/10 bg-white/3 backdrop-blur-xl p-6">
          <Link to="/" className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold">
              T
            </div>
            <span className="text-2xl font-semibold">TeamTask</span>
          </Link>

          <div className="space-y-3">
            {["Dashboard", "Projects", "My Tasks",].map(
              (item) => (
                <Link
                  key={item}
                  to={
                    item === "Projects"
                      ? "/projects"
                      : item === "My Tasks"
                        ? "/my-tasks"
                        : "/dashboard"
                  }
                  className="block px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition"
                >
                  {item}
                </Link>
              ),
            )}
          </div>
        </aside>

        <main className="w-full p-4 sm:p-6 lg:p-10">
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

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6"
              >
                <p className="text-white/50 text-sm">{stat.title}</p>
                <h2 className="text-4xl font-semibold mt-3">{stat.value}</h2>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.8fr] gap-6 mt-8">
            <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl overflow-hidden">
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
                      key={task.id}
                      className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-white/3"
                    >
                      <div>
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-white/50 mt-1">
                          {task.project_name || task.project || "No Project"}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/3">
                          {task.status}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/3">
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6">
              <h2 className="text-xl font-semibold mb-6">Task Overview</h2>

              <div className="space-y-5">
                {stats.slice(1, 3).map((stat) => (
                  <div key={stat.title}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/60">{stat.title}</span>
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

              <div className="mt-8 border border-white/10 rounded-2xl p-5">
                <p className="text-white/50 text-sm">Current Focus</p>
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
