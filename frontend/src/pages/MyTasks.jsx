import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function MyTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");

      setTasks(res.data.tasks || []);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      await API.put(`/tasks/${taskId}/status`, {
        status,
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Done"
  ).length;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[80px_80px] opacity-30" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-75 sm:w-175 h-75 sm:h-175 bg-cyan-500/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
          <div>
            <Link
              to="/dashboard"
              className="text-sm text-white/50 hover:text-white"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mt-3">
              My Tasks
            </h1>

            <p className="text-white/50 mt-3 max-w-2xl">
              Track your assigned tasks, monitor deadlines and update progress.
            </p>
          </div>

          <Link
            to="/projects"
            className="text-center px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition w-full sm:w-auto"
          >
            Go to Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6">
            <p className="text-white/50 text-sm">Total Tasks</p>

            <h2 className="text-4xl font-semibold mt-3">
              {tasks.length}
            </h2>
          </div>

          <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6">
            <p className="text-white/50 text-sm">Completed</p>

            <h2 className="text-4xl font-semibold mt-3">
              {completedTasks}
            </h2>
          </div>

          <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6">
            <p className="text-white/50 text-sm">Pending</p>

            <h2 className="text-4xl font-semibold mt-3">
              {pendingTasks}
            </h2>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No tasks assigned yet
            </h2>

            <p className="text-white/50 mt-3">
              Create tasks from project dashboard.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {task.title}
                    </h2>

                    <p className="text-white/50 mt-2">
                      {task.description ||
                        "No description"}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <span className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5">
                        {task.project?.name || "No Project"}
                      </span>

                      <span className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5">
                        {task.priority}
                      </span>

                      <span className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5">
                        {task.status}
                      </span>
                    </div>

                    <p className="text-white/40 text-sm mt-4">
                      Due:{" "}
                      {task.dueDate
                        ? new Date(
                            task.dueDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 min-w-50">
                    <button
                      onClick={() =>
                        updateTaskStatus(
                          task._id,
                          "To Do"
                        )
                      }
                      className="px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/5 transition"
                    >
                      To Do
                    </button>

                    <button
                      onClick={() =>
                        updateTaskStatus(
                          task._id,
                          "In Progress"
                        )
                      }
                      className="px-5 py-3 rounded-2xl border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 transition"
                    >
                      In Progress
                    </button>

                    <button
                      onClick={() =>
                        updateTaskStatus(
                          task._id,
                          "Done"
                        )
                      }
                      className="px-5 py-3 rounded-2xl border border-green-500/30 text-green-400 hover:bg-green-500/10 transition"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTasks;