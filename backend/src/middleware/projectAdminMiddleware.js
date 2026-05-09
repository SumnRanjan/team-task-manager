import Project from "../models/Project.js";

const projectAdminMiddleware = async (req, res, next) => {
  try {
    const projectId = req.params.id || req.body.projectId;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const member = project.members.find(
      (m) =>
        m.user.toString() === req.user.id &&
        m.role === "Admin"
    );

    if (!member) {
      return res.status(403).json({
        message: "Only admin can perform this action",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default projectAdminMiddleware;