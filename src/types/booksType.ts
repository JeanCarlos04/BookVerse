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
}
