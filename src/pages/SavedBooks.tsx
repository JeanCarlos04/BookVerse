import { FaBookBookmark, FaRegCalendarCheck } from "react-icons/fa6";
import CheckBook from "../components/CheckBook";
import useContextHook from "../hooks/useContextHook";
import useBookContext from "../hooks/useBookContext";
import ShowingBooks from "../components/ShowingBooks";
import BookSection from "../components/BookSection";

function SavedBooks() {
  const { showModals, bookId } = useContextHook();

  const {
    booksPerPage,
    reservedBooks,
    userSavedBooks,
    booksLoading,
    showLessPerPage,
    showMorePerPage,
  } = useBookContext();

  return (
    <main className="flex flex-col w-full h-full xl:pl-(--aside-width)">
      <BookSection
        booksLoading={booksLoading["reserved_books"]}
        sectionType="reserved_books"
        booksPerPage={booksPerPage["reserved_books"]}
        onShowLess={() => showLessPerPage("reserved_books")}
        onShowMore={() => showMorePerPage("reserved_books")}
        books={reservedBooks}
        iconColor="#51A2FF"
        TitleIcon={FaRegCalendarCheck}
        title="Reserved books"
      >
        <ShowingBooks
          booksPerPage={booksPerPage["reserved_books"]}
          bookData={reservedBooks}
        />
      </BookSection>

      <BookSection
        booksLoading={booksLoading["saved_books"]}
        sectionType="saved_books"
        booksPerPage={booksPerPage["saved_books"]}
        onShowLess={() => showLessPerPage("saved_books")}
        onShowMore={() => showMorePerPage("saved_books")}
        books={userSavedBooks}
        iconColor="#feb302"
        TitleIcon={FaBookBookmark}
        title="Saved books"
      >
        <ShowingBooks
          booksPerPage={booksPerPage["saved_books"]}
          bookData={userSavedBooks}
        />
      </BookSection>

      {bookId && showModals.checkBookModal && <CheckBook book_id={bookId} />}
    </main>
  );
}

export default SavedBooks;
