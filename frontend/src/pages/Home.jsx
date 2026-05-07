import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[80px_80px] opacity-30" />
      </div>

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-75 sm:w-175 h-75 sm:h-175 bg-cyan-500/10 blur-[120px]" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full border-b border-white/10 backdrop-blur-2xl z-50 bg-black/20">
        {" "}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">
              T
            </div>

            <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
              TeamTask
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <Link to="/projects" className="hover:text-white transition">
              Projects
            </Link>

            <Link to="/dashboard" className="hover:text-white transition">
              Dashboard
            </Link>

            <Link to="/my-tasks" className="hover:text-white transition">
              My Tasks
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="px-3 sm:px-5 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition text-xs sm:text-sm"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-3 sm:px-5 py-2 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition text-xs sm:text-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-16 sm:pb-20 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-2 text-xs sm:text-sm text-white/70 mb-6 sm:mb-8">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Smart Team Collaboration Platform
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-none">
                Plan smarter,
                <br />
                track progress,
                <br />
                deliver faster.
              </h1>

              <p className="mt-6 sm:mt-8 text-base sm:text-xl text-white/60 max-w-2xl leading-relaxed">
                Streamline your workflow with project management, task tracking,
                team collaboration and real-time productivity insights in one
                modern platform.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="text-center px-8 py-4 bg-white text-black rounded-2xl font-semibold hover:bg-white/90 transition"
                >
                  Get Started
                </Link>

                <a
                  href="#features"
                  className="text-center px-8 py-4 border border-white/10 rounded-2xl hover:bg-white/5 transition"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full" />

                <div className="relative border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <p className="text-white/50 text-sm">Team Productivity</p>

                      <h2 className="text-5xl font-semibold mt-2">96%</h2>
                    </div>

                    <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center text-2xl font-bold">
                      ⚡
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      "Project Planning",
                      "Task Monitoring",
                      "Member Collaboration",
                      "Workflow Analytics",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between border border-white/10 rounded-2xl px-4 py-4"
                      >
                        <span>{item}</span>

                        <span className="text-cyan-400 text-sm">Active</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div id="dashboard" className="mt-16 sm:mt-24 relative">
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />

            <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/3 backdrop-blur-xl overflow-hidden shadow-2xl">
              {/* Top */}
              <div className="h-12 sm:h-14 border-b border-white/10 flex items-center px-4 sm:px-5 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>

              {/* Dashboard */}
              <div className="grid lg:grid-cols-[260px_1fr] min-h-auto lg:min-h-150">
                {/* Sidebar */}
                <div className="border-r border-white/10 p-6 hidden lg:block">
                  <h2 className="text-xl font-semibold mb-10">TeamTask</h2>

                  <div className="space-y-3">
                    {[
                      "Dashboard",
                      "Projects",
                      "Tasks",
                      "Team Members",
                      "Analytics",
                      "Settings",
                    ].map((item) => (
                      <div
                        key={item}
                        className="px-4 py-3 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition cursor-pointer"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main */}
                <div className="p-4 sm:p-6 lg:p-10">
                  {/* Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                    {[
                      {
                        title: "Total Projects",
                        value: "12",
                      },
                      {
                        title: "Completed Tasks",
                        value: "84",
                      },
                      {
                        title: "Team Members",
                        value: "18",
                      },
                    ].map((card) => (
                      <div
                        key={card.title}
                        className="border border-white/10 bg-white/3 rounded-2xl p-5 sm:p-6"
                      >
                        <p className="text-white/50 text-sm">{card.title}</p>

                        <h2 className="text-3xl sm:text-4xl font-semibold mt-3">
                          {card.value}
                        </h2>
                      </div>
                    ))}
                  </div>

                  {/* Tasks */}
                  <div className="mt-8 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-4">
                      <h2 className="text-lg sm:text-xl font-semibold">
                        Active Tasks
                      </h2>

                      <button className="px-3 sm:px-4 py-2 rounded-xl bg-white text-black text-xs sm:text-sm font-medium">
                        New Task
                      </button>
                    </div>

                    <div className="divide-y divide-white/10">
                      {[
                        "Design dashboard UI",
                        "Implement JWT authentication",
                        "Setup MySQL database",
                        "Deploy app on Railway",
                      ].map((task, index) => (
                        <div
                          key={index}
                          className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-white/3 transition"
                        >
                          <div>
                            <h3 className="font-medium">{task}</h3>

                            <p className="text-sm text-white/50 mt-1">
                              Team collaboration task
                            </p>
                          </div>

                          <span className="w-fit px-3 py-1 rounded-full text-xs border border-white/10 bg-white/3">
                            In Progress
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <section id="features" className="mt-20 sm:mt-32">
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">
                Everything your team needs.
              </h2>

              <p className="mt-5 text-white/60 text-base sm:text-lg">
                Built with React, Node.js and MySQL for modern team
                collaboration and workflow management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 sm:mt-16">
              {[
                {
                  title: "Project Management",
                  desc: "Create and manage collaborative team projects.",
                },
                {
                  title: "Task Tracking",
                  desc: "Assign tasks and monitor progress in real-time.",
                },
                {
                  title: "JWT Authentication",
                  desc: "Secure login and protected routes.",
                },
                {
                  title: "Role Based Access",
                  desc: "Admin and member level permissions.",
                },
                {
                  title: "Analytics Dashboard",
                  desc: "Track completed and overdue tasks.",
                },
                {
                  title: "Responsive UI",
                  desc: "Modern TailwindCSS inspired experience.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="border border-white/10 bg-white/3 rounded-3xl p-6 sm:p-8 hover:bg-white/5 transition"
                >
                  <h3 className="text-xl sm:text-2xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-white/60 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Home;
