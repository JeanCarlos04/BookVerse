import cron from "node-cron";
import connection from "../connection/pg_connection.ts";

const disable_reserved_books = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      await connection.query(`
      UPDATE user_reserved_books
      SET active = false
      WHERE expires_in < NOW()
      AND active = true
    `);
    } catch (err) {
      console.error(err);
    }
  });
};

export default disable_reserved_books;
