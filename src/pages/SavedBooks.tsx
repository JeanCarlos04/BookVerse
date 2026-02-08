import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import Nav from "../components/Nav";
import type { BooksType } from "../types/booksType";
import { FaBookBookmark, FaDownload } from "react-icons/fa6";
import CheckBook from "../components/CheckBook";
import useContextHook from "../hooks/useContextHook";
import ShowingBooks from "../components/ShowingBooks";
import BookSection from "../components/BookSection";

function SavedBooks() {
  const [userSavedBooks, setUserSavedBooks] = useState<BooksType[]>([]);
  const { showModals, bookId, booksPerPage, setBooksPerPage, reservedBooks } =
    useContextHook();

  const getUserBooks = async () => {
    const res = await fetch("http://localhost:3000/user/books/get", {
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) setUserSavedBooks(data);
  };

  useEffect(() => {
    const init = async () => {
      getUserBooks();
    };

    init();
  }, []);

  return (
    <main className="flex w-full h-full">
      <Aside />
      <div className="w-full">
        <Nav />

        <BookSection
          booksLength={reservedBooks.length}
          iconColor="#27d844"
          TitleIcon={FaDownload}
          title="Reserved books"
          onShowMore={() =>
            setBooksPerPage({
              ...booksPerPage,
              reservedBooksPerPage: booksPerPage.reservedBooksPerPage + 10,
            })
          }
          children={
            <ShowingBooks
              booksPerPage={booksPerPage.reservedBooksPerPage}
              bookData={reservedBooks}
            />
          }
        />

        <BookSection
          booksLength={userSavedBooks.length}
          iconColor="#feb302"
          TitleIcon={FaBookBookmark}
          title="Saved books"
          onShowMore={() =>
            setBooksPerPage({
              ...booksPerPage,
              savedBooksPerPage: booksPerPage.savedBooksPerPage + 10,
            })
          }
          children={
            <ShowingBooks
              booksPerPage={booksPerPage.savedBooksPerPage}
              bookData={userSavedBooks}
            />
          }
        />
      </div>
      {bookId && showModals.checkBookModal && (
        <>{<CheckBook book_id={bookId} />}</>
      )}
    </main>
  );
}

export default SavedBooks;
