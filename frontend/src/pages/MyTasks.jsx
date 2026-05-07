import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";

function MyTasks() {
  const tasks = [
    {
      id: 1,
      title: "Build Login UI",
      project: "TeamTask Platform",
      priority: "High",
      status: "In Progress",
      due: "12 May 2026",
    },
    {
      id: 2,
      title: "Setup MySQL Database",
      project: "Backend API",
      priority: "Medium",
      status: "To Do",
      due: "15 May 2026",
    },
    {
      id: 3,
      title: "Create Dashboard",
      project: "Frontend",
      priority: "High",
      status: "Done",
      due: "10 May 2026",
    },
    {
      id: 4,
      title: "Deploy on Railway",
      project: "Deployment",
      priority: "Low",
      status: "Pending",
      due: "18 May 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[80px_80px] opacity-30" />

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-75 sm:w-175 h-75 sm:h-175 bg-cyan-500/10 blur-[120px]" />
      {/* <Navbar/> */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
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

          <button className="px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition w-full sm:w-auto">
            Create Task
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            { title: "Total Tasks", value: "24" },
            { title: "Completed", value: "16" },
            { title: "Pending", value: "08" },
          ].map((stat) => (
            <div
              key={stat.title}
              className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6"
            >
              <p className="text-white/50 text-sm">{stat.title}</p>

              <h2 className="text-4xl font-semibold mt-3">
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Tasks */}
        <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl overflow-hidden">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Assigned Tasks
            </h2>

            <span className="text-sm text-white/50">
              {tasks.length} Tasks
            </span>
          </div>

          <div className="divide-y divide-white/10">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-5 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 hover:bg-white/3 transition"
              >
                <div>
                  <h3 className="text-xl font-medium">
                    {task.title}
                  </h3>

                  <p className="text-white/50 mt-2">
                    {task.project}
                  </p>

                  <p className="text-sm text-white/40 mt-2">
                    Due: {task.due}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 rounded-full text-xs border border-white/10 bg-white/3">
                    {task.priority}
                  </span>

                  <span className="px-4 py-2 rounded-full text-xs border border-white/10 bg-white/3">
                    {task.status}
                  </span>

                  <button className="px-5 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition">
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {[
            ["To Do", "35%"],
            ["In Progress", "60%"],
            ["Done", "80%"],
          ].map(([label, width]) => (
            <div
              key={label}
              className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6"
            >
              <div className="flex justify-between text-sm mb-3">
                <span className="text-white/60">{label}</span>
                <span>{width}</span>
              </div>

              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyTasks;