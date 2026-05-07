import db from "../config/db.js";

export const createTask = (req, res) => {
  const {
    title,
    description,
    status,
    priority,
    due_date,
    project_id,
    assigned_to,
  } = req.body;

  db.query(
    `INSERT INTO tasks
    (title,description,status,priority,due_date,project_id,assigned_to)
    VALUES(?,?,?,?,?,?,?)`,
    [
      title,
      description,
      status,
      priority,
      due_date,
      project_id,
      assigned_to,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Task created",
      });
    }
  );
};

export const getTasks = (req, res) => {
  db.query(
    "SELECT * FROM tasks",
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json(result);
    }
  );
};

export const updateTaskStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query(
    "UPDATE tasks SET status = ? WHERE id = ?",
    [status, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json({
        message: "Task updated",
      });
    }
  );
};