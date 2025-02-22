import Task from "../models/task.js";
import User from "../models/user.js"; 

// Get tasks for a specific user
const getTask = async (req, res) => {
  const { userId } = req.body; 

  try {
    const user = await User.findOne({ username: userId });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const tasks = await Task.find({ user: user._id });

    if (!tasks.length) {
      return res.status(404).json({ success: false, message: "No tasks found for this user" });
    }

    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Error in getting tasks:", error);
    return res.status(500).json({ success: false, message: "Error in getting tasks" });
  }
};

// Create a new task for a user
const createTask = async (req, res) => {
  const { title, priority, status, userId, startTime, endTime } = req.body;

  try {
    const user = await User.findOne({ username: userId });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const newTask = new Task({
      title,
      priority,
      status,
      user: user._id, 
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });

    const task = await newTask.save();
    return res.status(201).json({ success: true, task });
  } catch (error) {
    console.error("Error in creating task:", error);
    return res.status(500).json({ success: false, message: "Error in creating task" });
  }
};


const updateTask = async (req, res) => {
  const { id, title, priority, status, userId, startTime, endTime } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username: userId });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Find and update the specific task that belongs to the user
    const task = await Task.findOneAndUpdate(
      { _id: id, user: user._id }, // Ensure only the user's task is updated
      { 
        title, 
        priority, 
        status, 
        startTime: startTime ? new Date(startTime) : undefined, 
        endTime: endTime ? new Date(endTime) : undefined 
      },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found or unauthorized" });
    }

    return res.status(200).json({ success: true, task });
  } catch (error) {
    console.error("Error in updating task:", error);
    return res.status(500).json({ success: false, message: "Error in updating task" });
  }
};


// Delete a task (Ensure user owns it)
const deleteTask = async (req, res) => {
  const { id, userId } = req.body; 

  try {
    const user = await User.findOne({ username: userId });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const task = await Task.findOneAndDelete({ _id: id, user: user._id }); 

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found or unauthorized" });
    }

    return res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ success: false, message: "An error occurred while deleting the task" });
  }
};

export default { getTask, createTask, updateTask, deleteTask };
