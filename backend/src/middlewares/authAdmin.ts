import type { Request, Response } from "../controllers/user_controllers.ts";
import connection from "../connection/pg_connection.ts";
import type { NextFn } from "./authToken.ts";

export const authAdmin = async (req: Request, res: Response, next: NextFn) => {
  const getAdmin = await connection.query(
    "SELECT role FROM users WHERE id = $1",
    [req.userData.id],
  );

  if (getAdmin.rows[0].role !== "ADMIN") {
    return res.json({ error: "You don't have permission." });
  }

  next();
};
