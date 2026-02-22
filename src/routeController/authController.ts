import type { Request, Response } from "express";
import User from "../dataModels/userModel.js";
import bcrypt from "bcrypt";
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json("please fill all requirements");
    }
    if (password.length < 6) {
      return res.status(400).json("password must be at least 6 characters");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
     return  res.status(400).json("Invalid email. Please try");
    }
    const existEmail = await User.findOne({ email });
    if (existEmail)
      return res
        .status(400)
        .json("this email is already exists. Please try with another");
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email
    });
  } catch (error) {
    return res.status(500).json("internal server error");
  }
};
