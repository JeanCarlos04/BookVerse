// import Aside from "../components/Aside";
// import Nav from "../components/Nav";
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
      "mostSaved_books",
    );

    setMostSavedBooks(data);
  };

  const getMostReservedBooks = async () => {
    const data = await fetchBooksFunction<BooksType[]>(
      "http://localhost:3000/books/mostReserved",
      setBooksLoading,
      "mostReserved_books",
    );

    setMostReservedBooks(data);
  };

  useEffect(() => {
    const init = async () => {
      await Promise.all([
        getMostLikedBooks(),
        getMostReservedBooks(),
        getMostSavedBooks(),
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
      <BookSection
        booksLoading={booksLoading["recommended_books"]}
        booksPerPage={booksPerPage["recommended_books"]}
        onShowLess={() => showLessPerPage("recommended_books")}
        onShowMore={() => showMorePerPage("recommended_books")}
        sectionType="recommended_books"
        books={books}
        iconColor="#f22b2b"
        TitleIcon={FaFire}
        title="Recommended"
      >
        <ShowingBooks
          booksPerPage={booksPerPage["recommended_books"]}
          bookData={books}
        />
      </BookSection>

      <BookSection
        booksLoading={booksLoading["mostLiked_books"]}
        booksPerPage={booksPerPage["mostLiked_books"]}
        onShowLess={() => showLessPerPage("mostLiked_books")}
        onShowMore={() => showMorePerPage("mostLiked_books")}
        sectionType="mostLiked_books"
        books={mostLikedBooks}
        iconColor="#f22b2b"
        TitleIcon={FaRegHeart}
        title="Most liked"
      >
        <ShowingBooks
          booksPerPage={booksPerPage["mostLiked_books"]}
          bookData={mostLikedBooks}
        />
      </BookSection>

      <BookSection
        booksLoading={booksLoading["mostSaved_books"]}
        sectionType="mostSaved_books"
        booksPerPage={booksPerPage["mostSaved_books"]}
        onShowLess={() => showLessPerPage("mostSaved_books")}
        onShowMore={() => showMorePerPage("mostSaved_books")}
        books={mostSavedBooks}
        iconColor="#f22b2b"
        TitleIcon={FaBookBookmark}
        title="Most saved"
      >
        <ShowingBooks
          booksPerPage={booksPerPage["mostSaved_books"]}
          bookData={mostSavedBooks}
        />
      </BookSection>

      <BookSection
        booksLoading={booksLoading["mostReserved_books"]}
        sectionType="mostReserved_books"
        booksPerPage={booksPerPage["mostReserved_books"]}
        onShowLess={() => showLessPerPage("mostReserved_books")}
        onShowMore={() => showMorePerPage("mostReserved_books")}
        books={mostReservedBooks}
        iconColor="#f22b2b"
        TitleIcon={FaCalendarCheck}
        title="Most reserved"
      >
        <ShowingBooks
          booksPerPage={booksPerPage["mostReserved_books"]}
          bookData={mostReservedBooks}
        />
      </BookSection>

      {bookId && showModals.checkBookModal && <CheckBook book_id={bookId} />}
    </main>
  );
}

export default Home;
