const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, required: true },
  status: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  totalTime: { type: Number, required: true }
});

module.exports = mongoose.model('Task', taskSchema);
