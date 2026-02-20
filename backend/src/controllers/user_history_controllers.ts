import connection from "../connection/pg_connection.ts";
import type { Request, Response } from "./user_controllers.ts";

export const getUserHistory = async (req: Request, res: Response) => {
  try {
    const history = await connection.query(
      `
      SELECT u_h.status_type, u_h.created_at, b.id, b.title, b.sinopsis, b.cover, b.likes, b.created_at, b.author, b.pages, b.stock, b.categories FROM user_history u_h
      JOIN users u ON u_h.user_id = u.id
      JOIN books b ON u_h.book_id = b.id
      WHERE u.id = $1
    `,
      [req.userData.id],
    );

    return res.json(history.rows);
  } catch (err) {
    console.error(err);
  }
};
