import { createContext, useState, useEffect } from "react";
import type { BooksReservedType, BooksType } from "../types/booksType";
import fetchBooksFunction from "../utils/fetchBooksFunction";
import useContextHook from "../hooks/useContextHook";
import type { SectionType } from "../types/sectionType";

type BooksContextProps = {
  children: React.ReactNode;
};

type BooksContextType = {
  setBooksPerPage: React.Dispatch<
    React.SetStateAction<Record<SectionType, number>>
  >;
  booksPerPage: Record<SectionType, number>;
  booksLoading: Record<SectionType, string | boolean | undefined>;
  setBooksLoading: React.Dispatch<
    React.SetStateAction<Record<SectionType, string | boolean | undefined>>
  >;
  reservedBooks: BooksReservedType[];
  userSavedBooks: BooksType[];
  favorieBooks: BooksType[];
  addBooks: (book_id: number) => void;
  addLike: (book_id: BooksType) => void;
  setFilteredSectionBooks: React.Dispatch<React.SetStateAction<BooksType[]>>;
  filteredSectionBooks: BooksType[];
  handleReserveBooks: (book_id: number, expires_in: Date) => void;
  showMorePerPage: (sectionType: SectionType) => void;
  showLessPerPage: (sectionType: SectionType) => void;
};

const booksContextDefault: BooksContextType = {
  setBooksPerPage: () => {},
  booksPerPage: {
    recommended_books: 10,
    most_liked_books: 10,
    favorite_books: 10,
    saved_books: 10,
    reserved_books: 10,
    most_reserved_books: 10,
    most_saved_books: 10,
    because_you_liked_books: 10,
  },
  booksLoading: {
    recommended_books: false,
    most_liked_books: false,
    favorite_books: false,
    saved_books: false,
    reserved_books: false,
    most_reserved_books: false,
    most_saved_books: false,
    because_you_liked_books: false,
  },
  setBooksLoading: () => {},
  reservedBooks: [],
  userSavedBooks: [],
  favorieBooks: [],
  addBooks: () => {},
  addLike: () => {},
  setFilteredSectionBooks: () => {},
  filteredSectionBooks: [],
  handleReserveBooks: () => {},
  showMorePerPage: () => {},
  showLessPerPage: () => {},
};

const BooksContext = createContext<BooksContextType>(booksContextDefault);

const BooksContextProvider = ({ children }: BooksContextProps) => {
  const { myProfile, setToastType, setCheckBookData } = useContextHook();
  const [filteredSectionBooks, setFilteredSectionBooks] = useState<BooksType[]>(
    [],
  );
  const [favorieBooks, setFavoriteBooks] = useState<BooksType[]>([]);
  const [reservedBooks, setReservedBooks] = useState<BooksReservedType[]>([]);
  const [userSavedBooks, setUserSavedBooks] = useState<BooksType[]>([]);
  const [booksLoading, setBooksLoading] = useState<
    Record<SectionType, string | undefined | boolean>
  >({
    recommended_books: false,
    most_liked_books: false,
    favorite_books: false,
    saved_books: false,
    reserved_books: false,
    most_reserved_books: false,
    most_saved_books: false,
    because_you_liked_books: false,
  });
  const [booksPerPage, setBooksPerPage] = useState<Record<SectionType, number>>(
    {
      recommended_books: 10,
      most_liked_books: 10,
      favorite_books: 10,
      saved_books: 10,
      reserved_books: 10,
      most_reserved_books: 10,
      most_saved_books: 10,
      because_you_liked_books: 10,
    },
  );

  const getUserSavedBooks = async () => {
    try {
      const data = await fetchBooksFunction<BooksType[]>(
        "http://localhost:3000/user/books/get",
        setBooksLoading,

        "saved_books",
      );

      setUserSavedBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserReservedBooks = async () => {
    try {
      const data = await fetchBooksFunction<BooksReservedType[]>(
        "http://localhost:3000/user/books/get/reserved",
        setBooksLoading,

        "reserved_books",
      );

      setReservedBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserFavoriteBooks = async () => {
    try {
      const data = await fetchBooksFunction<BooksReservedType[]>(
        "http://localhost:3000/user/books/get/liked",
        setBooksLoading,

        "favorite_books",
      );

      setFavoriteBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReserveBooks = async (
    book_id: BooksType["id"],
    expires_in: Date,
  ) => {
    const res = await fetch(
      `http://localhost:3000/user/books/reserve/${book_id}`,
      {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ expires_in }),
      },
    );

    if (res.ok) {
      setToastType({ type: "add", message: "Book reserved successfully" });
    }
  };

  const addLike = async (book_id: BooksType) => {
    setFavoriteBooks((prev) => {
      const exist = prev.some((book) => book.id === book_id.id);
      if (exist) {
        setToastType({ type: "delete", message: "Book unliked" });
        setCheckBookData((previo) => {
          if (previo) return { ...previo, likes: book_id.likes - 1 };
        });
        return prev.filter((book) => book.id !== book_id.id);
      } else {
        setCheckBookData((previo) => {
          if (previo) return { ...previo, likes: book_id.likes + 1 };
        });
        setToastType({ type: "add", message: "Book liked" });
        return [...prev, book_id];
      }
    });

    await fetch(`http://localhost:3000/user/books/like/${book_id.id}`, {
      credentials: "include",
      method: "POST",
    });
  };

  const addBooks = async (book_id: BooksType["id"]) => {
    const res = await fetch(`http://localhost:3000/user/books/add/${book_id}`, {
      credentials: "include",
      method: "POST",
    });

    if (res.ok) {
      getUserSavedBooks();
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!myProfile) return;
      await Promise.all([
        getUserSavedBooks(),
        getUserFavoriteBooks(),
        getUserReservedBooks(),
      ]);
    };

    init();
  }, [myProfile]);

  const showMorePerPage = (sectionType: SectionType) => {
    setBooksPerPage((prev) => ({
      ...prev,
      [sectionType]: prev[sectionType] + 10,
    }));
  };

  const showLessPerPage = (sectionType: SectionType) => {
    setBooksPerPage((prev) => ({ ...prev, [sectionType]: 10 }));
  };

  return (
    <BooksContext.Provider
      value={{
        booksLoading,
        booksPerPage,
        setBooksLoading,
        setBooksPerPage,
        reservedBooks,
        userSavedBooks,
        favorieBooks,
        addLike,
        addBooks,
        setFilteredSectionBooks,
        filteredSectionBooks,
        handleReserveBooks,
        showLessPerPage,
        showMorePerPage,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export { BooksContextProvider, BooksContext };
