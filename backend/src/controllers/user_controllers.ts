import connection from "../connection/pg_connection.ts";
import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import crypto from "crypto";
// import { sendResetEmail } from "../services/createMail.ts";

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

export const updateProfile = async (req: Request, res: Response) => {
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

export const changePassword = async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;

  const user = await connection.query("SELECT * FROM users WHERE id = $1", [
    req.userData.id,
  ]);

  const isPasswordMatch = await bcrypt.compare(
    currentPassword,
    user.rows[0].password,
  );

  if (!isPasswordMatch)
    return res.status(400).json({ error: "Invalid current password" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await connection.query("UPDATE users SET password = $1 WHERE id = $2", [
    hashedPassword,
    req.userData.id,
  ]);

  res.json({ message: "Password changed succesfully" });
};

// export const tokenResetPassword = async (req: Request, res: Response) => {
//   const { email } = req.body;

//   const founded_user = await connection.query(
//     "SELECT * FROM users WHERE email = $1",
//     [email],
//   );

//   if (founded_user.rows.length <= 0)
//     return res.status(404).json({ message: "Recibiras un correo" });

//   await connection.query(
//     "DELETE FROM token_reset_password WHERE user_id = $1",
//     [founded_user.rows[0].id],
//   );

//   const expires_at = new Date(Date.now() + 10 * 60 * 1000);

//   const token = crypto.randomBytes(32).toString("hex");
//   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

//   await connection.query(
//     "INSERT INTO token_reset_password (user_id, token,expire_date) VALUES ($1, $2, $3)",
//     [founded_user.rows[0].id, hashedToken, expires_at],
//   );

//   sendResetEmail(email, token);
// };
