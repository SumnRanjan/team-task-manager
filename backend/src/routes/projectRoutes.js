import express from "express";

import {
  createProject,
  getProjects,
  getSingleProject,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
} from "../controllers/projectController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import projectAdminMiddleware from "../middleware/projectAdminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProject);

router.get("/", authMiddleware, getProjects);

router.get("/:id", authMiddleware, getSingleProject);

router.put(
  "/:id",
  authMiddleware,
  projectAdminMiddleware,
  updateProject
);

router.delete(
  "/:id",
  authMiddleware,
  projectAdminMiddleware,
  deleteProject
);

router.post(
  "/:id/add-member",
  authMiddleware,
  projectAdminMiddleware,
  addMember
);

router.delete(
  "/:id/remove-member/:userId",
  authMiddleware,
  projectAdminMiddleware,
  removeMember
);

export default router;