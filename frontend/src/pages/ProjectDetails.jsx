import { Link, useParams } from "react-router-dom";

function ProjectDetails() {
  const { id } = useParams();

  const tasks = [
    { title: "Create login API", assignee: "Suman", status: "Done", priority: "High" },
    { title: "Design dashboard page", assignee: "Rahul", status: "In Progress", priority: "Medium" },
    { title: "Create task table", assignee: "Aman", status: "To Do", priority: "High" },
    { title: "Deploy on Railway", assignee: "Suman", status: "To Do", priority: "Low" },
  ];

  const members = ["Suman", "Rahul", "Aman", "Priya"];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[80px_80px] opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-75 sm:w-175 h-75 sm:h-175 bg-cyan-500/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link to="/projects" className="text-sm text-white/50 hover:text-white">
              ← Back to Projects
            </Link>

            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mt-3">
              TeamTask Project
            </h1>

            <p className="text-white/50 mt-3">
              Project ID: {id} · Manage tasks, members and project progress.
            </p>
          </div>

          <button className="px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition">
            Add Task
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {[
            { title: "Total Tasks", value: "24" },
            { title: "Completed", value: "12" },
            { title: "Members", value: "04" },
          ].map((stat) => (
            <div
              key={stat.title}
              className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6"
            >
              <p className="text-white/50 text-sm">{stat.title}</p>
              <h2 className="text-4xl font-semibold mt-3">{stat.value}</h2>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.8fr] gap-6">
          <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl overflow-hidden">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Project Tasks</h2>
              <span className="text-sm text-white/50">Task board</span>
            </div>

            <div className="divide-y divide-white/10">
              {tasks.map((task) => (
                <div
                  key={task.title}
                  className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-white/3"
                >
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-white/50 mt-1">
                      Assigned to {task.assignee}
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
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6">
              <h2 className="text-xl font-semibold mb-5">Team Members</h2>

              <div className="space-y-4">
                {members.map((member, index) => (
                  <div
                    key={member}
                    className="flex items-center justify-between border border-white/10 rounded-2xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold">
                        {member[0]}
                      </div>

                      <div>
                        <h3 className="font-medium">{member}</h3>
                        <p className="text-xs text-white/50">
                          {index === 0 ? "Admin" : "Member"}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs text-green-400">Active</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6">
              <h2 className="text-xl font-semibold mb-5">Progress</h2>

              <div className="space-y-5">
                {[
                  ["To Do", "35%"],
                  ["In Progress", "55%"],
                  ["Done", "70%"],
                ].map(([label, width]) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-2">
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
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;