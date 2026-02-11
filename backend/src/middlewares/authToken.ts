import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";
import type { Request, Response } from "../controllers/user_controllers.ts";

dotenv.config();

export type NextFn = express.NextFunction;

export const authToken = async (req: Request, res: Response, next: NextFn) => {
  const { token } = req.cookies;

  if (!token) return res.status(403).json("Token not provided");

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) return res.status(403).json("Error to auth token");
    req.userData = decoded;
    next();
  });
};
