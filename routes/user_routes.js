import express from "express";
import bcrypt from "bcryptjs"; // Use bcryptjs for ESM projects

import jwt from "jsonwebtoken";
import User from "../db/models/user_Schema.js"; // Add `.js` if you're using ES modules
import nodemailer from "nodemailer"; // Import nodemailer for email sending

const router = express.Router();

// Secret key (should be stored securely, e.g., in environment variables)
const JWT_SECRET = "zxcfhffnhf";

// Signup route
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ user_id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "4d",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "blessonphilip98@gmail.com",
        pass: "rtor xboi yvoc suvl",
      },
    });

    const mailOptions = {
      from: "blessonphilip98@gmail.com",
      to: email,
      subject: "Login Successful",
      text: "You have successfully logged in to your account.",
    };

    transporter.sendMail(mailOptions, () => {
      return res.status(200).json({ message: "login successful", token });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//forgot password route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const key = "zxcfhffnhf";
    const token = jwt.sign({ user_id: user._id }, key, { expiresIn: "1h" });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "blessonphilip98@gmail.com",
        pass: "rtor xboi yvoc suvl",
      },
    });

    const mailOptions = {
      from: "blessonphilip98@gmail.com",
      to: email,
      subject: "Reset Password",
      text: "`Hello friend, ${token}`",
    };

    transporter.sendMail(mailOptions, () => {
      return res.status(200).json({
        message: `
        Token sent to email`,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Reset password route
router.post("/reset-password", async (req, res) => {
  try {
    const { password, confirmPassword, token, email } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const key = "zxcfhffnhf";
    const isValid = jwt.verify(token, key);
    // Hash the new password before storing
    const hashedPassword = await bcrypt.hash(password, 2);
    const newUser = await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        password: hashedPassword,
      }
    );

    return res
      .status(200)
      .json({ message: "Password  has been reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
