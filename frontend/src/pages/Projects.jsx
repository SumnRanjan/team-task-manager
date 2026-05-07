import { Link } from "react-router-dom";

function Projects() {
  const projects = [
    {
      id: 1,
      name: "TeamTask Platform",
      desc: "Full stack task management platform using React & Node.js.",
      tasks: 24,
      members: 4,
      progress: "78%",
      status: "Active",
    },
    {
      id: 2,
      name: "Auth System",
      desc: "JWT authentication and protected routes implementation.",
      tasks: 12,
      members: 3,
      progress: "62%",
      status: "In Progress",
    },
    {
      id: 3,
      name: "Deployment Setup",
      desc: "Railway deployment and environment configuration.",
      tasks: 8,
      members: 2,
      progress: "40%",
      status: "Pending",
    },
    {
      id: 4,
      name: "Dashboard UI",
      desc: "Modern TailwindCSS inspired dashboard interface.",
      tasks: 16,
      members: 5,
      progress: "90%",
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[80px_80px] opacity-30" />

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-75 sm:w-175 h-75 sm:h-175 bg-cyan-500/10 blur-[120px]" />

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
              Projects
            </h1>

            <p className="text-white/50 mt-3 max-w-2xl">
              Manage projects, track team progress and collaborate efficiently
              with your team members.
            </p>
          </div>

          <button className="px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition w-full sm:w-auto">
            Create Project
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            { title: "Total Projects", value: "12" },
            { title: "Active Projects", value: "08" },
            { title: "Completed", value: "04" },
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6 hover:bg-white/5 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {project.name}
                  </h2>

                  <p className="text-white/50 mt-3 leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/3 whitespace-nowrap">
                  {project.status}
                </span>
              </div>

              {/* Progress */}
              <div className="mt-8">
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-white/60">
                    Project Progress
                  </span>

                  <span>{project.progress}</span>
                </div>

                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: project.progress }}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="border border-white/10 rounded-2xl p-4">
                  <p className="text-white/50 text-sm">Tasks</p>

                  <h3 className="text-3xl font-semibold mt-2">
                    {project.tasks}
                  </h3>
                </div>

                <div className="border border-white/10 rounded-2xl p-4">
                  <p className="text-white/50 text-sm">Members</p>

                  <h3 className="text-3xl font-semibold mt-2">
                    {project.members}
                  </h3>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/projects/${project.id}`}
                  className="flex-1 text-center px-5 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition"
                >
                  Open Project
                </Link>

                <button className="flex-1 px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/5 transition">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;