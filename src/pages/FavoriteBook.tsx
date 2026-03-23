import BookSection from "../components/BookSection";
import ShowingBooks from "../components/ShowingBooks";
import CheckBook from "../components/CheckBook";
import useContextHook from "../hooks/useContextHook";
import useBookContext from "../hooks/useBookContext";

import { FaRegHeart } from "react-icons/fa6";

function FavoriteBooks() {
  const { bookId, showModals } = useContextHook();
  const {
    showLessPerPage,
    showMorePerPage,
    booksPerPage,
    favorieBooks,
    booksLoading,
  } = useBookContext();

  return (
    <main className="flex flex-col w-full h-full xl:pl-(--aside-width)">
      <BookSection
        booksLoading={booksLoading["favorite_books"]}
        sectionType="favorite_books"
        booksPerPage={booksPerPage["favorite_books"]}
        onShowLess={() => showLessPerPage("favorite_books")}
        onShowMore={() => showMorePerPage("favorite_books")}
        books={favorieBooks}
        iconColor="#f22b2b"
        TitleIcon={FaRegHeart}
        title="Favorite books"
      >
        <ShowingBooks
          booksPerPage={booksPerPage["favorite_books"]}
          bookData={favorieBooks}
        />
      </BookSection>

      {bookId && showModals.checkBookModal && <CheckBook book_id={bookId} />}
    </main>
  );
}

export default FavoriteBooks;
