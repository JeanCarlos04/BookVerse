import connection from "../connection/pg_connection.ts";
import type { Response, Request } from "./user_controllers.ts";

export type BooksType = {
  id: number;
  title: string;
  sinopsis: string;
  created_at: Date;
};

export const reserveBook = async (req: Request, res: Response) => {
  const { book_id } = req.params;
  const { expires_in } = req.body;

  const founded_book = await connection.query(
    "SELECT * FROM user_reserved_books WHERE user_id = $1 AND book_id = $2",
    [req.userData.id, book_id],
  );

  if (founded_book.rows.length < 1) {
    const reservedBook = await connection.query(
      `INSERT INTO user_reserved_books (user_id, book_id, expires_in) 
      VALUES ($1, $2, $3) RETURNING *`,
      [req.userData.id, book_id, expires_in],
    );

    res.json(reservedBook);
  } else {
    const reservedBook = await connection.query(
      `UPDATE user_reserved_books 
      SET status = 'reserved'
      WHERE user_id = $1 AND book_id = $2 RETURNING *`,
      [req.userData.id, book_id],
    );

    res.json(reservedBook);
  }
};

export const returnBook = async (req: Request, res: Response) => {
  const { book_id } = req.params;

  const unreservedBook = await connection.query(
    "UPDATE user_reserved_books SET status = 'returned' WHERE book_id = $1 RETURNING *",
    [book_id],
  );

  res.json(unreservedBook.rows);
};

export const getUserReservedBooks = async (req: Request, res: Response) => {
  const reserverdsBooks = await connection.query(
    `SELECT b.title, b.sinopsis, u_r_b.reserved_in, u_r_b.expires_in, b.cover, b.id
      FROM user_reserved_books u_r_b 
      JOIN books b ON b.id = u_r_b.book_id
     WHERE u_r_b.user_id = $1 AND status = 'reserved'`,
    [req.userData.id],
  );

  res.json(reserverdsBooks.rows);
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

export const getUserSavedBooks = async (req: Request, res: Response) => {
  try {
    const user_books = await connection.query(
      `
      SELECT u_b.book_id as id, b.cover, b.title, 
      b.sinopsis, b.created_at, b.categories, b.author
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
