import Aside from "../components/Aside";
import Nav from "../components/Nav";
import BookSection from "../components/BookSection";
import ShowingBooks from "../components/ShowingBooks";
import CheckBook from "../components/CheckBook";
import useContextHook from "../hooks/useContextHook";
import { FaRegHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";
import type { BooksType } from "../types/booksType";

function FavoriteBooks() {
  const { bookId, showModals, setBooksPerPage, booksPerPage } =
    useContextHook();
  const [favoriteBooks, setFavoriteBooks] = useState<BooksType[]>([]);

  const getFavoriteBooks = async () => {
    const res = await fetch("http://localhost:3000/user/books/get/liked", {
      credentials: "include",
    });

    const data = await res.json();
    if (res.ok) setFavoriteBooks(data);
  };

  useEffect(() => {
    const init = async () => {
      getFavoriteBooks();
    };

    init();
  }, []);

  return (
    <main className="flex w-full h-full">
      <Aside />
      <div className="w-full">
        <Nav />

        <BookSection
          sectionType="favoriteBooks"
          booksPerPage={booksPerPage.favoriteBooksPerPage}
          books={favoriteBooks}
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
              bookData={favoriteBooks}
            />
          }
        />

        {bookId && showModals.checkBookModal && (
          <>{<CheckBook book_id={bookId} />}</>
        )}
      </div>
    </main>
  );
}

export default FavoriteBooks;
