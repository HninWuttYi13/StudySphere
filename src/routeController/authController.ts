import type { Request, Response } from "express";
import User from "../dataModels/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({msg: "please fill all requirements"});
    }
    if (password.length < 6) {
      return res.status(400).json({msg: "Password must be at least 6 characters"});
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({msg: "Invalid email. Please try"});
    }
    const normalizedEmail = email.toLowerCase();
    const existEmail = await User.findOne({ email: normalizedEmail });
    if (existEmail)
      return res
        .status(400)
        .json({msg: "Email already exists"});
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email: normalizedEmail,
      password: hashPassword,
    });
    await newUser.save();
    const token = generateToken(newUser._id.toString());
    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token
    });
  } catch (error) {
    return res.status(500).json({msg: "internal server error"});
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({msg: "email or password required"});
  try {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select("+password");
    if (!user) return res.status(401).json({ msg: "Invalid credentials" });
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return res.status(401).json({msg: "invalid credentials"});
    const token = generateToken(user._id.toString())
    return res.status(200).json({
      _id: user._id,
      username: normalizedEmail,
      email: user.email,
      token,
    });
    
  } catch (error) {
    return res.status(500).json("internal server error");
  }
};
