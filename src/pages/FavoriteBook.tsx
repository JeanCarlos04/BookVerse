import Aside from "../components/Aside";
import Nav from "../components/Nav";
import BookSection from "../components/BookSection";
import ShowingBooks from "../components/ShowingBooks";
import CheckBook from "../components/CheckBook";
import useContextHook from "../hooks/useContextHook";
import { FaRegHeart } from "react-icons/fa6";

function FavoriteBooks() {
  const { bookId, showModals, setBooksPerPage, booksPerPage, favorieBooks } =
    useContextHook();

  return (
    <main className="flex w-full h-full">
      <Aside />
      <div className="w-full">
        <Nav />

        <BookSection
          sectionType="favoriteBooks"
          booksPerPage={booksPerPage.favoriteBooksPerPage}
          books={favorieBooks}
          iconColor="#f22b2b"
          TitleIcon={FaRegHeart}
          title="Favorite books"
          onShowMore={() =>
            setBooksPerPage({
              ...booksPerPage,
              favoriteBooksPerPage: booksPerPage.favoriteBooksPerPage + 10,
            })
          }
          children={
            <ShowingBooks
              booksPerPage={booksPerPage.favoriteBooksPerPage}
              bookData={favorieBooks}
            />
          }
        />

        {bookId && showModals.checkBookModal && <CheckBook book_id={bookId} />}
      </div>
    </main>
  );
}

export default FavoriteBooks;
