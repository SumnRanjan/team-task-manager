import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import API from "../api/axios.js";
import toast from "react-hot-toast";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);

  const [deleteProjectId, setDeleteProjectId] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const currentUserId = useMemo(() => {
    return (
      currentUser?._id ||
      currentUser?.user?._id ||
      currentUser?.id
    );
  }, [currentUser]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await API.get("/projects");

      setProjects(res.data.projects || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditProjectId(null);

    setFormData({
      name: "",
      description: "",
    });

    setShowModal(true);
  };

  const openEditModal = (project) => {
    setEditProjectId(project._id);

    setFormData({
      name: project.name || "",
      description: project.description || "",
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);

    setEditProjectId(null);

    setFormData({
      name: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitProject = async (e) => {
    e.preventDefault();

    try {
      if (editProjectId) {
        await API.put(
          `/projects/${editProjectId}`,
          formData
        );

        toast.success(
          "Project updated successfully"
        );
      } else {
        await API.post("/projects", formData);

        toast.success(
          "Project created successfully"
        );
      }

      closeModal();

      fetchProjects();
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  const handleDeleteProject = async () => {
    try {
      await API.delete(
        `/projects/${deleteProjectId}`
      );

      setProjects((prev) =>
        prev.filter(
          (project) =>
            project._id !== deleteProjectId
        )
      );

      toast.success(
        "Project deleted successfully"
      );

      setShowDeleteModal(false);

      setDeleteProjectId(null);
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete project");
    }
  };

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
              Projects
            </h1>

            <p className="text-white/50 mt-3 max-w-2xl">
              Manage projects, track team progress
              and collaborate efficiently.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition w-full sm:w-auto"
          >
            Create Project
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6">
            <p className="text-white/50 text-sm">
              Total Projects
            </p>

            <h2 className="text-4xl font-semibold mt-3">
              {projects.length}
            </h2>
          </div>

          <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6">
            <p className="text-white/50 text-sm">
              Active Projects
            </p>

            <h2 className="text-4xl font-semibold mt-3">
              {projects.length}
            </h2>
          </div>

          <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6">
            <p className="text-white/50 text-sm">
              Completed
            </p>

            <h2 className="text-4xl font-semibold mt-3">
              0
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-white/60 text-xl">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="border border-white/10 bg-white/3 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No projects found
            </h2>

            <p className="text-white/50 mt-3">
              Create your first project.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => {
              const isAdmin =
                project.members?.some((member) => {
                  const memberUserId =
                    member.user?._id ||
                    member.user;

                  return (
                    String(memberUserId) ===
                      String(currentUserId) &&
                    String(
                      member.role
                    ).toLowerCase() ===
                      "admin"
                  );
                });

              return (
                <div
                  key={project._id}
                  className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6 hover:bg-white/5 transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-semibold">
                        {project.name}
                      </h2>

                      <p className="text-white/50 mt-3 leading-relaxed">
                        {project.description ||
                          "No description added"}
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/3 whitespace-nowrap">
                      Active
                    </span>
                  </div>

                  <div className="mt-8 border border-white/10 rounded-2xl p-4">
                    <p className="text-white/50 text-sm">
                      Created At
                    </p>

                    <h3 className="text-sm font-medium mt-2">
                      {project.createdAt
                        ? new Date(
                            project.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </h3>
                  </div>

                  <div className="mt-8 border border-white/10 rounded-2xl p-4">
                    <p className="text-white/50 text-sm">
                      Members
                    </p>

                    <h3 className="text-sm font-medium mt-2">
                      {project.members?.length || 0}{" "}
                      Members
                    </h3>
                  </div>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link
                      to={`/projects/${project._id}`}
                      className="text-center px-5 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition"
                    >
                      Open
                    </Link>

                    {isAdmin && (
                      <>
                        <button
                          onClick={() =>
                            openEditModal(project)
                          }
                          className="px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/5 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setDeleteProjectId(
                              project._id
                            );

                            setShowDeleteModal(
                              true
                            );
                          }}
                          className="px-5 py-3 rounded-2xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-lg border border-white/10 bg-zinc-900 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                {editProjectId
                  ? "Edit Project"
                  : "Create Project"}
              </h2>

              <button
                onClick={closeModal}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSubmitProject}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm mb-2 text-white/60">
                  Project Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter project name"
                  className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-white/60">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter project description"
                  className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                {editProjectId
                  ? "Update Project"
                  : "Create Project"}
              </button>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-md border border-white/10 bg-zinc-900 rounded-3xl p-6">
            <h2 className="text-2xl font-semibold">
              Delete Project
            </h2>

            <p className="text-white/50 mt-3">
              Are you sure you want to delete
              this project?
            </p>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() =>
                  setShowDeleteModal(false)
                }
                className="flex-1 py-3 rounded-2xl border border-white/10 hover:bg-white/5 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteProject}
                className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;