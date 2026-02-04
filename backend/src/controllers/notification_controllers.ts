import connection from "../connection/pg_connection.ts";
import type { Request, Response } from "./user_controllers";

export const createNotification = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  try {
    const createdNotification = await connection.query(
      "INSERT INTO notifications (title, description, user_id) VALUES ($1, $2, $3)",
      [title, description, req.userData.id],
    );

    res.json(createdNotification.rows);
  } catch (err) {
    console.error(err);
  }
};

export const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const userNotifications = await connection.query(
      `SELECT u.avatar_url, title, description, created_at, seen FROM notifications JOIN users u ON u.id = user_id  
      WHERE user_id = $1`,
      [req.userData.id],
    );

    res.json(userNotifications.rows);
  } catch (err) {
    console.error(err);
  }
};

export const deleteUserNotifications = async (req: Request, res: Response) => {
  await connection.query("DELETE FROM notifications WHERE user_id = $1", [
    req.userData.id,
  ]);

  res.json({ message: "Notifications deleted" });
};
