import Task from "../models/task.js";

// Get all tasks
const getTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.json({ success: true, tasks });
  } catch (error) {
    console.error("Error in getting tasks:", error);
    return res.json({ success: false, message: "Error in getting tasks" });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { title, priority, status, startTime, endTime } = req.body;

  try {
    const newTask = new Task({
      title,
      priority,
      status,
      startTime,
      endTime,
    });
    const task = await newTask.save();

    return res.json({ success: true, task });
  } catch (error) {
    console.error("Error in creating task:", error);
    return res.json({ success: false, message: "Error in creating task" });
  }
};

// Update an existing task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, priority, status, startTime, endTime } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.json({ success: false, message: "Task not found" });
    }

    task.title = title;
    task.priority = priority;
    task.status = status;
    task.startTime = startTime;
    task.endTime = endTime;

    await task.save();

    return res.json({ success: true, task });
  } catch (error) {
    console.error("Error in updating task:", error);
    return res.json({ success: false, message: "Error in updating task" });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    await task.remove();

    return res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ success: false, message: "An error occurred while deleting the task" });
  }
};

export default { getTask, createTask, updateTask, deleteTask };
