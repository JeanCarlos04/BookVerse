import Aside from "../components/Aside";
import Nav from "../components/Nav";
import { FaBookBookmark, FaRegCalendarCheck } from "react-icons/fa6";
import CheckBook from "../components/CheckBook";
import useContextHook from "../hooks/useContextHook";
import ShowingBooks from "../components/ShowingBooks";
import BookSection from "../components/BookSection";

function SavedBooks() {
  const {
    showModals,
    bookId,
    booksPerPage,
    setBooksPerPage,
    reservedBooks,
    userSavedBooks,
    booksLoading,
  } = useContextHook();

  return (
    <main className="flex w-full h-full">
      <Aside />
      <div className="w-full">
        <Nav />

        <BookSection
          booksLoading={booksLoading.userReservedBooks}
          sectionType="reserved_books"
          booksPerPage={booksPerPage.reservedBooksPerPage}
          books={reservedBooks}
          iconColor="#51A2FF"
          TitleIcon={FaRegCalendarCheck}
          title="Reserved books"
          onShowLess={() =>
            setBooksPerPage({
              ...booksPerPage,
              reservedBooksPerPage: 10,
            })
          }
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
          booksLoading={booksLoading.userSavedBooks}
          sectionType="saved_books"
          booksPerPage={booksPerPage.savedBooksPerPage}
          books={userSavedBooks}
          iconColor="#feb302"
          TitleIcon={FaBookBookmark}
          title="Saved books"
          onShowLess={() =>
            setBooksPerPage({
              ...booksPerPage,
              savedBooksPerPage: 10,
            })
          }
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
      {bookId && showModals.checkBookModal && <CheckBook book_id={bookId} />}
    </main>
  );
}

export default SavedBooks;
