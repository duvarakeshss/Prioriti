import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: Number, required: true, min: 1, max: 5 },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "In Progress", "Completed"],
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  totalTime: {
    type: Number,
    required: true,
    default: function () {
      if (!this.startTime || !this.endTime) {
        return 0; // Default to 0 if times are missing
      }
      const duration = (new Date(this.endTime) - new Date(this.startTime)) / (1000 * 60 * 60); // Hours
      return Math.max(0, duration); // Ensure totalTime is non-negative
    },
  },
});

// Middleware to recalculate totalTime before saving if necessary
taskSchema.pre("save", function (next) {
  if (this.startTime && this.endTime) {
    const duration = (new Date(this.endTime) - new Date(this.startTime)) / (1000 * 60 * 60);
    this.totalTime = Math.max(0, duration); // Recalculate and ensure non-negative
  }
  next();
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
