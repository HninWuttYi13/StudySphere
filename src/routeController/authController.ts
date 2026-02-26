import type { Request, Response } from "express";
import User from "../dataModels/userModel.js";
import Token from "../dataModels/tokenModel.js";
import bcrypt from "bcrypt";
import { generateRefreshToken, generateAccessToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken"
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
   generateAccessToken(newUser._id.toString(), res);
 const refreshToken=  generateRefreshToken(newUser._id.toString(), res);
   await Token.create({
    user: newUser._id,
    refreshToken
   })
    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
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
    generateAccessToken(user._id.toString(), res);
   const refreshToken= generateRefreshToken(user._id.toString(), res);
   await Token.deleteMany({ user: user._id });
    //save refresh Token
    await Token.create({
     user: user._id,
     refreshToken
    })
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
    
  } catch (error) {
    return res.status(500).json("internal server error");
  }
};
export const logout = async(req:Request, res: Response)=> {
  try {
    const refreshToken = req.cookies.refreshToken;
    if(refreshToken){
      await Token.deleteOne({refreshToken})
    }
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });
   res.clearCookie("refreshToken", {
     httpOnly: true,
     sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
     secure: process.env.NODE_ENV === "production",
   });
    return res.status(200).json({msg: "Logout successfully"})
  } catch (error) {
     return res.status(500).json({msg: "Internal server error"});
  }
}
export const refreshTokenController = async(req:Request, res:Response)=>{
  const token = req.cookies.refreshToken;
 if(!token) return res.sendStatus(401);
 try {
  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as {userId: string};
   //check token in database
   const existingToken = await Token.findOne({
    user: decoded.userId,
    refreshToken:token
   })
   if(!existingToken) return res.sendStatus(403);
   generateAccessToken(decoded.userId, res);
   return res.sendStatus(200);
  }
  
  catch (error) {
  return res.status(500).json({msg: "internal server error"});
 }
}