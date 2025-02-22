import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: Number, required: true, min: 1, max: 5 },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "In Progress", "Completed"],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});


taskSchema.pre("save", function (next) {
  if (this.startTime && this.endTime) {
    const duration = (new Date(this.endTime) - new Date(this.startTime)) / (1000 * 60 * 60);
    this.totalTime = Math.max(0, duration);
  }
  next();
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
