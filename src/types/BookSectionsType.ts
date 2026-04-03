import type { SectionType } from "../types/sectionType";
import type { IconType } from "react-icons";
import type { BooksType } from "./booksType";

export type BookSectionType = {
  key: SectionType;
  title: string;
  books: BooksType[];
  icon: IconType;
}[];
