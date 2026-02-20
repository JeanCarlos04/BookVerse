import cron from "node-cron";
import connection from "../connection/pg_connection.ts";

const disable_reserved_books = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("ejecuto cron");
    try {
      await connection.query(`
      UPDATE user_reserved_books
      SET status = 'expired'
      WHERE expires_in < NOW() 
      AND status = 'reserved'
    `);
    } catch (err) {
      console.error(err);
    }
  });
};

export default disable_reserved_books;
