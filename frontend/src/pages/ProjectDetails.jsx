import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios.js";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/projects/${id}`);
        setProject(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading project...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[80px_80px] opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-75 sm:w-175 h-75 sm:h-175 bg-cyan-500/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link
              to="/projects"
              className="text-sm text-white/50 hover:text-white"
            >
              ← Back to Projects
            </Link>

            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mt-3">
              {project.name}
            </h1>

            <p className="text-white/50 mt-3">
              {project.description || "No description added"}
            </p>

            <p className="text-white/40 text-sm mt-2">
              Project ID: {project.id} · Created on{" "}
              {new Date(project.created_at).toLocaleDateString()}
            </p>
          </div>

          <button className="px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition">
            Add Task
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6">
            <p className="text-white/50 text-sm">Total Tasks</p>
            <h2 className="text-4xl font-semibold mt-3">0</h2>
          </div>

          <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6">
            <p className="text-white/50 text-sm">Completed</p>
            <h2 className="text-4xl font-semibold mt-3">0</h2>
          </div>

          <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6">
            <p className="text-white/50 text-sm">Status</p>
            <h2 className="text-4xl font-semibold mt-3">Active</h2>
          </div>
        </div>

        <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-semibold">No tasks yet</h2>
          <p className="text-white/50 mt-3">
            Task API connect karne ke baad yaha real tasks show honge.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
