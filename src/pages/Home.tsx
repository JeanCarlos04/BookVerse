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
import fetchFunction from "../utils/fetchFunction";

function Home() {
  const { showModals, bookId, search, setBooksPerPage, booksPerPage } =
    useContextHook();
  const [books, setBooks] = useState<BooksType[]>([]);
  const [mostLikedBooks, setMostLikedBooks] = useState<BooksType[]>([]);
  const timeRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const searchBooks = async (search: string) => {
    const params = new URLSearchParams();
    params.set("search", search);

    const res = await fetch(
      `http://localhost:3000/books/search?${params.toString()}`,
      { credentials: "include" },
    );

    if (res.ok) {
      const data = await res.json();
      setBooks(data);
    }
  };

  const getMostLikedBooks = async () => {
    const data = await fetchFunction<BooksType[]>(
      "http://localhost:3000/books/get/mostLiked",
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

    timeRef.current = setTimeout(() => {
      searchBooks(search);
    }, 500);

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
          sectionType="recommendedBooks"
          booksPerPage={booksPerPage.reccommendedPerPage}
          books={books}
          iconColor="#f22b2b"
          TitleIcon={FaFire}
          title="Recommended"
          onShowMore={() =>
            setBooksPerPage({
              ...booksPerPage,
              reccommendedPerPage: booksPerPage.reccommendedPerPage + 10,
            })
          }
          children={
            <ShowingBooks
              booksPerPage={booksPerPage.reccommendedPerPage}
              bookData={books}
            />
          }
        />

        <BookSection
          sectionType="mostLikedBooks"
          booksPerPage={booksPerPage.mostLikedPerPage}
          books={mostLikedBooks}
          iconColor="#f22b2b"
          TitleIcon={FaFire}
          title="Most liked"
          onShowMore={() =>
            setBooksPerPage({
              ...booksPerPage,
              mostLikedPerPage: booksPerPage.mostLikedPerPage + 10,
            })
          }
          children={
            <ShowingBooks
              booksPerPage={booksPerPage.reccommendedPerPage}
              bookData={mostLikedBooks}
            />
          }
        />

        {bookId && showModals.checkBookModal && <CheckBook book_id={bookId} />}
      </div>

      <ToastModal />
    </main>
  );
}

export default Home;
