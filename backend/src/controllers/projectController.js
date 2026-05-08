import db from "../config/db.js";

export const createProject = (req, res) => {
  const { name, description } = req.body || {};

  if (!name) {
    return res.status(400).json({
      message: "Project name is required",
    });
  }

  const created_by = req.user.id;

  db.query(
    "INSERT INTO projects(name, description, created_by) VALUES(?,?,?)",
    [name, description, created_by],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Project created",
        project: {
          id: result.insertId,
          name,
          description,
          created_by,
        },
      });
    }
  );
};

export const getProjects = (req, res) => {
  db.query("SELECT * FROM projects", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json({
      projects: result,
    });
  });
};

export const getSingleProject = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM projects WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      res.status(200).json(result[0]);
    }
  );
};

export const updateProject = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const userId = req.user.id;

  db.query(
    "UPDATE projects SET name=?, description=? WHERE id=? AND created_by=?",
    [name, description, id, userId],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      res.status(200).json({
        message: "Project updated successfully",
      });
    }
  );
};

export const deleteProject = (req, res) => {
  const { id } = req.params;

  const userId = req.user.id;

  db.query(
    "DELETE FROM projects WHERE id=? AND created_by=?",
    [id, userId],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      res.status(200).json({
        message: "Project deleted successfully",
      });
    }
  );
};