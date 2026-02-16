import connection from "../connection/pg_connection.ts";
import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

declare global {
  namespace Express {
    interface Request {
      userData: {
        id: string;
        role: string;
      };
    }
  }
}

export type Request = express.Request;
export type Response = express.Response;

dotenv.config();

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await connection.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, hashedPassword],
  );

  res.json(createdUser.rows[0]);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user_founded = await connection.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    const isMatch = await bcrypt.compare(
      password,
      user_founded.rows[0].password,
    );

    if (!isMatch) return res.status(403).json("Invalid credentials");

    const token = jwt.sign(
      {
        id: user_founded.rows[0].id,
        role: user_founded.rows[0].role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "2h" },
    );

    res.cookie("token", token);
    res.json({ message: "Logged in successfully" });
  } catch (err) {
    console.error(err);
  }
};

export const getUser = async (req: Request, res: Response) => {
  const user_founded = await connection.query(
    "SELECT username, email, role, avatar_url FROM users WHERE id = $1",
    [req.userData.id],
  );

  res.json(user_founded.rows[0]);
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

export const uploadAvatar = async (req: Request, res: Response) => {
  const avatar = req.file?.filename;
  const { username } = req.body;

  await connection.query(
    `
    UPDATE users SET 
      username = COALESCE($1, username),
      avatar_url = COALESCE($2, avatar_url)
    WHERE id = $3
    `,
    [username, avatar, req.userData.id],
  );

  res.json({ message: "Avatar uploaded succesfully" });
};
