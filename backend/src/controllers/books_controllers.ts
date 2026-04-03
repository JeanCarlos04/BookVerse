import connection from "../connection/pg_connection.ts";
import type { Response, Request } from "./user_controllers.ts";

export const createBooks = async (req: Request, res: Response) => {
  const { title, sinopsis, author, pages, categories } = req.body;
  const cover = req.file;

  const parsedPages = JSON.parse(pages);
  const pagesIntoNumber = Number(parsedPages);
  const parsedCategories = JSON.parse(categories);

  if (!cover) return res.status(400).json({ error: "Image is required" });
  const coverName = cover.originalname;

  const created_book = await connection.query(
    "INSERT INTO books (title, sinopsis, cover, author, pages, categories) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [title, sinopsis, coverName, author, pagesIntoNumber, parsedCategories],
  );

  res.json(created_book.rows[0]);
};

export const updateBooks = async (req: Request, res: Response) => {
  const cover = req.file?.filename;
  const { book_id } = req.params;
  const { title, sinopsis, pages, categories } = req.body;

  const parsedPages = JSON.parse(pages);
  const pagesIntoNumber = Number(parsedPages);
  const parsedCategories = JSON.parse(categories);

  const updated_book = await connection.query(
    `
      UPDATE books SET 
          title = COALESCE($1, title),
          sinopsis = COALESCE($2, sinopsis),
          cover = COALESCE($3, cover),
          pages = COALESCE($4, pages),
          categories = COALESCE($5, categories)
        WHERE id = $6
        RETURNING *
        `,
    [title, sinopsis, cover, pagesIntoNumber, parsedCategories, book_id],
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

export const filterBooks = async (req: Request, res: Response) => {
  const { title, author, categories } = req.body;

  const nullishTitle = title ? title.toString() : null;
  const nullishAuthor = author ? author.toString() : null;
  const nullishCategories = categories?.length ? categories : null;

  const filteredBooks = await connection.query(
    `SELECT * FROM books 
   WHERE ($1::text IS NULL OR title ILIKE '%' || $1::text || '%')
   AND ($2::text IS NULL OR author ILIKE '%' || $2::text || '%')
   AND ($3::text[] IS NULL OR categories && $3::text[])`,
    [nullishTitle, nullishAuthor, nullishCategories],
  );

  res.json(filteredBooks.rows);
};

export const getBook = async (req: Request, res: Response) => {
  const { book_id } = req.params;

  const foundedBook = await connection.query(
    "SELECT * FROM books WHERE id = $1",
    [book_id],
  );

  res.json(foundedBook.rows[0]);
};

export const getBookByTitle = async (req: Request, res: Response) => {
  const { title } = req.query;

  const foundedBook = await connection.query(
    "SELECT * FROM books WHERE title ILIKE $1",
    [`%${title}%`],
  );

  res.json(foundedBook.rows[0]);
};

export const getMostLikedBooks = async (req: Request, res: Response) => {
  try {
    const mostLikedBooks = await connection.query(
      `SELECT * FROM books ORDER BY likes DESC LIMIT 50`,
    );

    res.json(mostLikedBooks.rows);
  } catch (err) {
    console.error(err);
  }
};

export const getMostSavedBooks = async (req: Request, res: Response) => {
  try {
    const mostSavedBooks = await connection.query(
      "SELECT * FROM books ORDER BY saved DESC LIMIT 50",
    );

    res.json(mostSavedBooks.rows);
  } catch (err) {
    console.error(err);
  }
};

export const getMostReserved = async (req: Request, res: Response) => {
  try {
    const mostReservedBooks = await connection.query(
      "SELECT * FROM books ORDER BY reserves DESC LIMIT 50",
    );

    res.json(mostReservedBooks.rows);
  } catch (err) {
    console.error(err);
  }
};

export const getRelatedBooks = async (req: Request, res: Response) => {
  const likedBooks = await connection.query(
    "SELECT * FROM books b JOIN user_liked_books l_b ON l_b.book_id = b.id",
  );

  const randomIndex = Math.round(Math.random());

  const books = await connection.query(
    "SELECT * FROM books WHERE categories && $1",
    [likedBooks.rows[randomIndex].categories],
  );

  res.json(books.rows);
};
