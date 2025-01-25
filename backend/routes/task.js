// const express = require('express');
// const jwt = require('jsonwebtoken');
// const Task = require('../models/task');

// const router = express.Router();
// const JWT_SECRET = 'your_secret_key';

// // Middleware to verify JWT
// const verifyToken = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// // Create task
// router.post('/', verifyToken, async (req, res, next) => {
//   const { title, priority, status, startTime, endTime, totalTime } = req.body;

//   try {
//     const newTask = new Task({ title, priority, status, startTime, endTime, totalTime, userId: req.user.userId });
//     await newTask.save();

//     res.status(201).json({ message: 'Task created successfully', task: newTask });
//   } catch (err) {
//     next(err);
//   }
// });

// // Get tasks with pagination
// router.get('/', verifyToken, async (req, res, next) => {
//   const { page = 1, limit = 10 } = req.query;

//   try {
//     const tasks = await Task.find({ userId: req.user.userId, deleted: false })
//       .skip((page - 1) * limit)
//       .limit(Number(limit));
//     const total = await Task.countDocuments({ userId: req.user.userId, deleted: false });
      

//     res.status(200).json({ tasks, total, page: Number(page), limit: Number(limit) });
//   } catch (err) {
//     next(err);
//   }
// });

// // Update task
// router.put('/:id', verifyToken, async (req, res, next) => {
//   const { id } = req.params;
//   const { title, priority, status, startTime, endTime, totalTime } = req.body;

//   try {
//     const task = await Task.findOneAndUpdate(
//       { _id: id, userId: req.user.userId, deleted: false },
//       { title, priority, status, startTime, endTime, totalTime },
//       { new: true }
//     );

//     if (!task) return res.status(404).json({ message: 'Task not found' });

//     res.status(200).json({ message: 'Task updated successfully', task });
//   } catch (err) {
//     next(err);
//   }
// });

// // Soft delete task
// router.delete('/:id', verifyToken, async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const task = await Task.findOneAndUpdate(
//       { _id: id, userId: req.user.userId, deleted: false },
//       { deleted: true },
//       { new: true }
//     );

//     if (!task) return res.status(404).json({ message: 'Task not found' });

//     res.status(200).json({ message: 'Task deleted successfully' });
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;
