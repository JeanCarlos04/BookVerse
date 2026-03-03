import Aside from "../components/Aside";
import Nav from "../components/Nav";
import BookSection from "../components/BookSection";
import ShowingBooks from "../components/ShowingBooks";
import CheckBook from "../components/CheckBook";
import { FaFire } from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";
import { useEffect } from "react";
import { useState, useRef } from "react";
import type { BooksType } from "../types/booksType";
import ToastModal from "../components/UX/ToastModal";
import fetchBooksFunction from "../utils/fetchBooksFunction";

function Home() {
  const {
    showModals,
    bookId,
    search,
    setBooksPerPage,
    booksPerPage,
    setBooksLoading,
    booksLoading,
  } = useContextHook();
  const [books, setBooks] = useState<BooksType[]>([]);
  const [mostLikedBooks, setMostLikedBooks] = useState<BooksType[]>([]);
  const timeRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const searchBooks = async (search: string) => {
    try {
      setBooksLoading((prev) => ({ ...prev, generalBooks: true }));
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
            generalBooks: "empty",
          }));
        }
        setBooks(data);
        setBooksLoading((prev) => ({ ...prev, generalBooks: false }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getMostLikedBooks = async () => {
    const data = await fetchBooksFunction<BooksType[]>(
      "http://localhost:3000/books/get/mostLiked",
      setBooksLoading,

      "generalBooks",
    );

    setMostLikedBooks(data);
  };

  useEffect(() => {
    const init = async () => {
      getMostLikedBooks();
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
    <main className="flex w-full h-full">
      <Aside />
      <div className="w-full">
        <Nav />

        <BookSection
          booksLoading={booksLoading.generalBooks}
          sectionType="recommended_books"
          booksPerPage={booksPerPage.reccommendedPerPage}
          books={books}
          iconColor="#f22b2b"
          TitleIcon={FaFire}
          title="Recommended"
          onShowLess={() =>
            setBooksPerPage({
              ...booksPerPage,
              reccommendedPerPage: 10,
            })
          }
          onShowMore={() =>
            setBooksPerPage({
              ...booksPerPage,
              reccommendedPerPage: booksPerPage.reccommendedPerPage + 10,
            })
          }
        >
          <ShowingBooks
            booksPerPage={booksPerPage.reccommendedPerPage}
            bookData={books}
          />
        </BookSection>

        <BookSection
          booksLoading={booksLoading.generalBooks}
          sectionType="mostLiked_books"
          booksPerPage={booksPerPage.mostLikedPerPage}
          books={mostLikedBooks}
          iconColor="#f22b2b"
          TitleIcon={FaFire}
          title="Most liked"
          onShowLess={() =>
            setBooksPerPage({
              ...booksPerPage,
              mostLikedPerPage: 10,
            })
          }
          onShowMore={() =>
            setBooksPerPage({
              ...booksPerPage,
              mostLikedPerPage: booksPerPage.mostLikedPerPage + 10,
            })
          }
        >
          {" "}
          <ShowingBooks
            booksPerPage={booksPerPage.reccommendedPerPage}
            bookData={mostLikedBooks}
          />
        </BookSection>

        {bookId && showModals.checkBookModal && <CheckBook book_id={bookId} />}
      </div>

      <ToastModal />
    </main>
  );
}

export default Home;
