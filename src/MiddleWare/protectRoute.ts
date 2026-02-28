import type {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { env } from "../validations/env.js";
export const protectRoute = async(req: Request, res: Response, next: NextFunction)=> {
try {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json({msg: "Token Required"});
    const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as {
      userId: string;
    };
    req.user =  decoded;   //get object {userId: string}
    next()
} catch (error) {
    return res.status(401).json({ msg: "Invalid or expired access token" });
}
  
}