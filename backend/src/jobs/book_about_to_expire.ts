import cron from "node-cron";
import connection from "../connection/pg_connection.ts";

const book_about_to_expire = () => {
  cron.schedule("0 0 * * *", async () => {
    const booksAboutToExpire = await connection.query(
      "SELECT * FROM user_reserved_books WHERE expires_in::date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '1 day' AND status = 'reserved'",
    );

    if (booksAboutToExpire.rows.length > 0) {
      booksAboutToExpire.rows.forEach(async (book) => {
        const bookData = await connection.query(
          "SELECT * FROM books WHERE id = $1",
          [book.book_id],
        );

        await connection.query(
          "INSERT INTO notifications (title, description, user_id, book_id) VALUES ('Book about to expire', format('The book %s expire tomorrow', $1::text), $2, $3)",
          [bookData.rows[0].title, book.user_id, book.book_id],
        );
      });
    }
  });
};

export default book_about_to_expire;
