import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Login with Username & Password
const loginUser = async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await UserModel.findOne({ username: userName.toLowerCase() });

        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

        return res.json({ success: true, token, role: user.role });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Register New User
const registerUser = async (req, res) => {
    const { userName, password } = req.body;
    try {
        if (!userName || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const exists = await UserModel.findOne({ username: userName.toLowerCase() });
        if (exists) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long and include an uppercase letter and a number" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            username: userName.toLowerCase(),
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({ success: true, message: "User registered successfully" });

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { loginUser, registerUser};
