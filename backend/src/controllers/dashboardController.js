import Task from "../models/Task.js";

export const getDashboardStats = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user.id,
    });

    const totalTasks = tasks.length;

    const todoTasks = tasks.filter(
      (task) => task.status === "To Do"
    ).length;

    const inProgressTasks = tasks.filter(
      (task) => task.status === "In Progress"
    ).length;

    const completedTasks = tasks.filter(
      (task) => task.status === "Done"
    ).length;

    const overdueTasks = tasks.filter(
      (task) =>
        new Date(task.dueDate) < new Date() &&
        task.status !== "Done"
    ).length;

    res.status(200).json({
      totalTasks,
      todoTasks,
      inProgressTasks,
      completedTasks,
      overdueTasks,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};