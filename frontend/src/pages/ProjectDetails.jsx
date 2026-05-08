/* eslint-disable react-hooks/set-state-in-effect */
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios.js";

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [memberEmail, setMemberEmail] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    status: "To Do",
  });

  const fetchProject = async () => {
    try {
      const res = await API.get(`/projects/${id}`);
      setProject(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      const filteredTasks = (res.data.tasks || []).filter(
        (task) => task.project?._id === id
      );
      setTasks(filteredTasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddMember = async () => {
    if (!memberEmail) return;

    try {
      await API.post(`/projects/${id}/add-member`, {
        email: memberEmail,
        role: "Member",
      });

      setMemberEmail("");
      fetchProject();
    } catch (error) {
      alert(error.response?.data?.message || "Add member failed");
    }
  };

  const handleAddTask = async () => {
    if (!taskForm.title || !taskForm.assignedTo) {
      alert("Please enter title and assign member");
      return;
    }

    try {
      await API.post("/tasks", {
        title: taskForm.title,
        description: taskForm.description,
        assignedTo: taskForm.assignedTo,
        priority: taskForm.priority,
        status: taskForm.status,
        projectId: id,
        dueDate: new Date(),
      });

      setShowTaskModal(false);

      setTaskForm({
        title: "",
        description: "",
        assignedTo: "",
        priority: "Medium",
        status: "To Do",
      });

      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Task add failed");
    }
  };

  const handleRemoveMember = async (userId) => {
    const confirmRemove = window.confirm("Remove this member?");
    if (!confirmRemove) return;

    try {
      await API.delete(`/projects/${id}/remove-member/${userId}`);

      setProject((prev) => ({
        ...prev,
        members: prev.members.filter((member) => member.user._id !== userId),
      }));

      setTasks((prev) =>
        prev.filter((task) => task.assignedTo?._id !== userId)
      );
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

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
            <Link to="/projects" className="text-sm text-white/50 hover:text-white">
              ← Back to Projects
            </Link>

            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mt-3">
              {project.name}
            </h1>

            <p className="text-white/50 mt-3">
              {project.description || "No description added"}
            </p>

            <p className="text-white/40 text-sm mt-2">
              Project ID: {project._id} · Created on{" "}
              {project.createdAt
                ? new Date(project.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <button
            onClick={() => setShowTaskModal(true)}
            className="px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition"
          >
            Add Task
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6">
            <p className="text-white/50 text-sm">Total Members</p>
            <h2 className="text-4xl font-semibold mt-3">
              {project.members?.length || 0}
            </h2>
          </div>

          <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6">
            <p className="text-white/50 text-sm">Created By</p>
            <h2 className="text-xl font-semibold mt-3">
              {project.createdBy?.name || "N/A"}
            </h2>
          </div>

          <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6">
            <p className="text-white/50 text-sm">Status</p>
            <h2 className="text-4xl font-semibold mt-3">Active</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_0.8fr] gap-6">
          <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-10">
            <h2 className="text-2xl font-semibold mb-5">Project Tasks</h2>

            {tasks.length === 0 ? (
              <p className="text-white/50">No tasks yet</p>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className="border border-white/10 rounded-2xl p-4"
                  >
                    <h3 className="font-semibold">{task.title}</h3>

                    <p className="text-sm text-white/50 mt-1">
                      {task.description || "No description"}
                    </p>

                    <p className="text-sm text-white/50 mt-1">
                      Status: {task.status || "To Do"}
                    </p>

                    <p className="text-sm text-white/50 mt-1">
                      Assigned To: {task.assignedTo?.name || "N/A"}
                    </p>

                    <p className="text-sm text-white/50 mt-1">
                      Priority: {task.priority || "Medium"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter member email"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  className="flex-1 bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none"
                />

                <button
                  onClick={handleAddMember}
                  className="px-5 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition"
                >
                  Add Member
                </button>
              </div>
            </div>

            <div className="border border-white/10 bg-white/3 backdrop-blur-xl rounded-3xl p-6">
              <h2 className="text-2xl font-semibold mb-5">Project Members</h2>

              <div className="space-y-4">
                {project.members?.length === 0 ? (
                  <p className="text-white/50">No members found</p>
                ) : (
                  project.members.map((member) => (
                    <div
                      key={member._id}
                      className="border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4"
                    >
                      <div>
                        <h3 className="font-semibold">
                          {member.user?.name || "Unknown User"}
                        </h3>

                        <p className="text-white/50 text-sm">
                          {member.user?.email || "No email"}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5">
                          {member.role}
                        </span>

                        {member.role !== "Admin" && (
                          <button
                            onClick={() => handleRemoveMember(member.user._id)}
                            className="px-3 py-1 rounded-full text-xs border border-red-500/30 text-red-400 hover:bg-red-500/10 transition"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showTaskModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-xl border border-white/10 bg-zinc-900 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Create Task</h2>

              <button
                onClick={() => setShowTaskModal(false)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task title"
                value={taskForm.title}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, title: e.target.value })
                }
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none"
              />

              <textarea
                placeholder="Task description"
                value={taskForm.description}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, description: e.target.value })
                }
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none resize-none"
                rows="4"
              />

              <select
                value={taskForm.assignedTo}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, assignedTo: e.target.value })
                }
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none"
              >
                <option value="">Assign Member</option>

                {project.members?.map((member) => (
                  <option key={member.user?._id} value={member.user?._id}>
                    {member.user?.name}
                  </option>
                ))}
              </select>

              <select
                value={taskForm.priority}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, priority: e.target.value })
                }
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <select
                value={taskForm.status}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, status: e.target.value })
                }
                className="w-full bg-black border border-white/10 rounded-2xl px-4 py-3 outline-none"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>

              <button
                onClick={handleAddTask}
                className="w-full py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;