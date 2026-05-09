import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    setLoading(true);

    const toastId = toast.loading("Logging in...");

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful", {
        id: toastId,
      });

      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";

      setError(message);

      toast.error(message, {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[80px_80px] opacity-30" />

      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-75 sm:w-150 h-75 sm:h-150 bg-cyan-500/10 blur-[120px]" />

      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
        <div className="hidden lg:flex flex-col justify-between border-r border-white/10 p-12">
          <div>
            <Link to="/" className="inline-flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold">
                T
              </div>
              <span className="text-2xl font-semibold">TeamTask</span>
            </Link>

            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-2 text-sm text-white/70 mb-8 ml-6">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              Team Task Manager
            </div>

            <h1 className="text-5xl font-semibold leading-tight tracking-tight">
              Manage projects, tasks and teams easily.
            </h1>

            <p className="mt-6 text-white/60 text-lg leading-relaxed">
              Track progress, assign tasks, manage members and stay productive
              with your team from one modern dashboard.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-white/10 bg-white/3 rounded-2xl p-6">
              <p className="text-white/50 text-sm">Projects</p>
              <h2 className="text-4xl font-semibold mt-2">12+</h2>
            </div>

            <div className="border border-white/10 bg-white/3 rounded-2xl p-6">
              <p className="text-white/50 text-sm">Tasks</p>
              <h2 className="text-4xl font-semibold mt-2">80+</h2>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-md mx-auto">
            <div className="lg:hidden text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold">
                  T
                </div>
                <span className="text-2xl font-semibold">TeamTask</span>
              </Link>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Welcome Back
              </h2>

              <p className="text-white/50 mt-3">
                Login to continue your workspace
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-300 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/30 outline-none focus:border-white/30 focus:bg-white/6 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/30 outline-none focus:border-white/30 focus:bg-white/6 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-white text-black py-4 font-semibold hover:bg-white/90 transition disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center mt-6 text-white/50">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-white font-semibold hover:underline"
              >
                Create account
              </Link>
            </p>

            <p className="text-center mt-4">
              <Link to="/" className="text-sm text-white/40 hover:text-white">
                Back to home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
