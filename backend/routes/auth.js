// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const Joi = require('joi');
// const User = require('../models/User');

// const router = express.Router();
// const JWT_SECRET = 'your_secret_key';

// // Input validation schema
// const registerSchema = Joi.object({
//   username: Joi.string().min(3).max(30).required(),
//   password: Joi.string().min(6).required(),
// });

// // Register endpoint
// router.post('/register', async (req, res, next) => {
//   const { error } = registerSchema.validate(req.body);
//   if (error) return res.status(400).json({ message: error.details[0].message });

//   const { username, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) return res.status(400).json({ message: 'Username already exists' });

//     const hashedPassword = await bcrypt.hash(password, 12);
//     const newUser = new User({ username, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     next(err);
//   }
// });

// // Login endpoint
// router.post('/login', async (req, res, next) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ message: 'Invalid username or password' });

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) return res.status(400).json({ message: 'Invalid username or password' });

//     const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;
