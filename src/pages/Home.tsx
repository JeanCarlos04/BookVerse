import BookSection from "../components/BookSection";
import ShowingBooks from "../components/ShowingBooks";
import CheckBook from "../components/CheckBook";
import {
  FaFire,
  FaRegHeart,
  FaBookBookmark,
  FaCalendarCheck,
} from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";
import useBookContext from "../hooks/useBookContext";
import { useEffect } from "react";
import { useState, useRef } from "react";
import type { BooksType } from "../types/booksType";
import fetchBooksFunction from "../utils/fetchBooksFunction";
import type { BookSectionType } from "../types/BookSectionsType";

function Home() {
  const { showModals, bookId, search } = useContextHook();
  const {
    booksPerPage,
    setBooksLoading,
    booksLoading,
    showMorePerPage,
    showLessPerPage,
  } = useBookContext();
  const [books, setBooks] = useState<BooksType[]>([]);
  const [mostLikedBooks, setMostLikedBooks] = useState<BooksType[]>([]);
  const [mostSavedBooks, setMostSavedBooks] = useState<BooksType[]>([]);
  const [mostReservedBooks, setMostReservedBooks] = useState<BooksType[]>([]);
  const timeRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [relatedBooks, setRelatedBooks] = useState<BooksType[]>([]);

  const sections: BookSectionType = [
    {
      key: "recommended_books",
      title: "Recommended",
      books: books,
      icon: FaFire,
    },
    {
      key: "most_liked_books",
      title: "Most liked",
      books: mostLikedBooks,
      icon: FaRegHeart,
    },
    {
      key: "most_saved_books",
      title: "Most saved",
      books: mostSavedBooks,
      icon: FaBookBookmark,
    },
    {
      key: "most_reserved_books",
      title: "Most reserved",
      books: mostReservedBooks,
      icon: FaCalendarCheck,
    },
    {
      key: "because_you_liked_books",
      title: "Because you liked...",
      books: relatedBooks,
      icon: FaCalendarCheck,
    },
  ];

  const searchBooks = async (search: string) => {
    try {
      setBooksLoading((prev) => ({ ...prev, ["recommended_books"]: true }));
      const params = new URLSearchParams();
      params.set("search", search);

      const res = await fetch(
        `http://localhost:3000/books/search?${params.toString()}`,
        { credentials: "include" },
      );

      if (res.ok) {
        const data = await res.json();

        if (data.length <= 0) {
          return setBooksLoading((prev) => ({
            ...prev,
            ["recommended_books"]: "empty",
          }));
        }
        setBooks(data);
        setBooksLoading((prev) => ({ ...prev, ["recommended_books"]: false }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  console.log(relatedBooks);

  const getMostLikedBooks = async () => {
    const data = await fetchBooksFunction<BooksType[]>(
      "http://localhost:3000/books/get/mostLiked",
      setBooksLoading,
      "recommended_books",
    );

    setMostLikedBooks(data);
  };

  const getMostSavedBooks = async () => {
    const data = await fetchBooksFunction<BooksType[]>(
      "http://localhost:3000/books/mostSaved",
      setBooksLoading,
      "most_saved_books",
    );

    setMostSavedBooks(data);
  };

  const getMostReservedBooks = async () => {
    const data = await fetchBooksFunction<BooksType[]>(
      "http://localhost:3000/books/mostReserved",
      setBooksLoading,
      "most_reserved_books",
    );

    setMostReservedBooks(data);
  };

  const getRelatedBooks = async () => {
    const data = await fetchBooksFunction<BooksType[]>(
      "http://localhost:3000/books/realtedBooks",
      setBooksLoading,
      "because_you_liked_books",
    );

    setRelatedBooks(data);
  };

  useEffect(() => {
    const init = async () => {
      await Promise.all([
        getMostLikedBooks(),
        getMostReservedBooks(),
        getMostSavedBooks(),
        getRelatedBooks(),
      ]);
    };

    init();
  }, []);

  useEffect(() => {
    if (timeRef.current) clearTimeout(timeRef.current);

    if (!search) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      searchBooks(search);
    } else {
      timeRef.current = setTimeout(() => {
        searchBooks(search);
      }, 500);
    }

    return () => {
      clearTimeout(timeRef.current);
    };
  }, [search]);

  return (
    <main className="flex flex-col w-full h-full xl:pl-(--aside-width)">
      {sections.map((section) => {
        const { books, icon, title, key } = section;
        return (
          <BookSection
            booksLoading={booksLoading[key]}
            booksPerPage={booksPerPage[key]}
            onShowLess={() => showLessPerPage(key)}
            onShowMore={() => showMorePerPage(key)}
            sectionType={key}
            books={books}
            iconColor="#f22b2b"
            TitleIcon={icon}
            title={title}
          >
            <ShowingBooks booksPerPage={booksPerPage[key]} bookData={books} />
          </BookSection>
        );
      })}

      {bookId && showModals.checkBookModal && <CheckBook book_id={bookId} />}
    </main>
  );
}

export default Home;
