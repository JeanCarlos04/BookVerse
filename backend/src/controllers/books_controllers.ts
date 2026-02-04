import connection from "../connection/pg_connection.ts";
import type { Response, Request } from "./user_controllers.ts";

export const createBooks = async (req: Request, res: Response) => {
  const { title, sinopsis } = req.body;

  const created_book = await connection.query(
    "INSERT INTO books (title, sinopsis) VALUES ($1,$2) RETURNING *",
    [title, sinopsis],
  );

  res.json(created_book.rows[0]);
};

export const updateBooks = async (req: Request, res: Response) => {
  const cover = req.file?.filename;
  const { book_id } = req.params;
  const { title, sinopsis } = req.body;

  const updated_book = await connection.query(
    `
      UPDATE books SET 
          title = COALESCE($1, title),
          sinopsis = COALESCE($2, sinopsis),
          cover = COALESCE($3, cover)
        WHERE id = $4
        RETURNING *
        `,
    [title, sinopsis, cover, book_id],
  );

  res.json(updated_book.rows[0]);
};

export const deleteBooks = async (req: Request, res: Response) => {
  const { book_id } = req.params;

  const deleted_book = await connection.query(
    "DELETE FROM books WHERE id = $1 RETURNING *",
    [book_id],
  );

  res.json(deleted_book.rows[0]);
};

export const searchBooks = async (req: Request, res: Response) => {
  const { search } = req.query;

  try {
    const foundedBooks = await connection.query(
      `SELECT * FROM books WHERE title ILIKE $1 ORDER BY created_at`,
      [`%${search}%`],
    );

    res.json(foundedBooks.rows);
  } catch (err) {
    console.error(err);
  }
};

export const getBook = async (req: Request, res: Response) => {
  const { book_id } = req.params;

  const foundedBook = await connection.query(
    "SELECT * FROM books WHERE id = $1",
    [book_id],
  );

  res.json(foundedBook.rows[0]);
};

export const getMostLikedBooks = async (req: Request, res: Response) => {
  try {
    const mostLikedBooks = await connection.query(
      `SELECT * FROM books ORDER BY likes DESC LIMIT 10`,
    );

    res.json(mostLikedBooks.rows);
  } catch (err) {
    console.error(err);
  }
};

