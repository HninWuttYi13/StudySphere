import jwt from "jsonwebtoken";
import type { Response } from "express";
import { env } from "../validations/env.js";
export const generateAccessToken = (userId: string, res:Response) => {
  const accessToken= jwt.sign({ userId }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15min",
  });
  res.cookie("accessToken", accessToken, {
    maxAge: 15 * 60 * 1000,
    httpOnly: true,
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    secure: env.NODE_ENV === "production",
  });
  return accessToken
};
export const generateRefreshToken = (userId: string, res:Response)=> {
  const refreshToken = jwt.sign({ userId }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d"
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24* 60* 60*1000,
    httpOnly: true,
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    secure: env.NODE_ENV === "production",
  });
  return refreshToken
}
