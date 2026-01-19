import connection from "../connection/pg_connection.ts";
import type { Response, Request } from "./user_controllers.ts";

export type BooksType = {
  id: number;
  title: string;
  sinopsis: string;
  created_at: Date;
};

export const addBooks = async (req: Request, res: Response) => {
  const { book_id } = req.params;

  try {
    const founded_book = await connection.query(
      `SELECT 1 FROM user_books WHERE user_id = $1 AND book_id = $2`,
      [req.userData.id, book_id],
    );
    if (founded_book.rows.length > 0) {
      await connection.query(
        `DELETE FROM user_books WHERE user_id = $1 AND book_id = $2`,
        [req.userData.id, book_id],
      );
    } else {
      await connection.query(
        `INSERT INTO user_books (user_id, book_id) VALUES ($1, $2)`,
        [req.userData.id, book_id],
      );
    }
    res.json({ message: "Correct!" });
  } catch (err) {
    console.error(err);
  }
};

export const getUserBooks = async (req: Request, res: Response) => {
  try {
    const user_books = await connection.query(
      `
      SELECT u_b.book_id as id, b.title, 
      b.sinopsis, b.created_at, b.categories
      FROM user_books u_b
        JOIN books b ON b.id = u_b.book_id
        JOIN users u ON u.id = u_b.user_id
      WHERE u.id = $1
    `,
      [req.userData.id],
    );

    res.json(user_books.rows);
  } catch (err) {
    console.error(err);
  }
};

export const getLikedBooks = async (req: Request, res: Response) => {
  const likedBooks = await connection.query(
    `SELECT b.id, b.title, b.sinopsis, b.cover, b.likes, b.pages, b.author 
      FROM user_liked_books
        JOIN books b ON book_id = b.id
      WHERE user_id = $1`,
    [req.userData.id],
  );

  res.json(likedBooks.rows);
};

export const addLikes = async (req: Request, res: Response) => {
  const { book_id } = req.params;

  try {
    const founded_book = await connection.query(
      "SELECT 1 FROM user_liked_books WHERE book_id = $1 AND user_id = $2",
      [book_id, req.userData.id],
    );

    if (founded_book.rows.length > 0) {
      await connection.query(
        "DELETE FROM user_liked_books WHERE book_id = $1 AND user_id = $2",
        [book_id, req.userData.id],
      );
    } else {
      const liked_book = await connection.query(
        "INSERT INTO user_liked_books (user_id, book_id) VALUES ($1,$2) RETURNING *",
        [req.userData.id, book_id],
      );

      res.json(liked_book);
    }
  } catch (err) {
    console.error(err);
  }
};
