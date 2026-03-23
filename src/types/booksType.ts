export interface BooksType {
  id: number;
  cover: string;
  title: string;
  sinopsis: string;
  author: string;
  created_at: Date;
  likes: number;
  pages: number;
  categories: string[];
}

export type BooksReservedType = BooksType & {
  expires_in: Date;
  reserved_in: Date;
};

export type HistoryBooksType = BooksType & {
  created_at: Date;
  status_type: string;
};

export type BooksCategoriesTypes = [
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Romance",
  "Horror",
  "Adventure",
  "Dystopian",
  "Self-help",
  "Programming",
  "Technology",
  "History",
  "Biography",
  "Finance",
  "Psychology",
  "Business",
];
