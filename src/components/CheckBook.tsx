import {
  FaArrowRightLong,
  FaRegHeart,
  FaRegBookmark,
  FaBookmark,
  FaHeart,
} from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";
import { useEffect, useState } from "react";
import type { BooksType } from "../types/booksType";
import fetchFunction from "../utils/fetchFunction";
import ConfirmDelete from "./UX/ConfirmDelete";
import BookSpecs from "./UX/BookSpecs";
import useBookContext from "../hooks/useBookContext";

type CheckBookProps = {
  book_id: BooksType["id"];
};

function CheckBook({ book_id }: CheckBookProps) {
  const {
    setShowModals,
    showModals,

    setCheckBookData,
    checkBookData,

    setToastType,
  } = useContextHook();

  const {
    handleReserveBooks,
    reservedBooks,
    addLike,
    addBooks,
    userSavedBooks,
    favorieBooks,
  } = useBookContext();

  const unreserveBook = async () => {
    const res = await fetch(
      `http://localhost:3000/user/books/return/${book_id}`,
      { credentials: "include", method: "PATCH" },
    );
    if (res.ok) {
      setToastType({
        message: "Book returned",
        type: "delete",
        class: "showToast",
      });
    }
  };

  const getBook = async () => {
    const data = await fetchFunction<BooksType>(
      `http://localhost:3000/books/get/${book_id}`,
    );

    setCheckBookData(data);
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const isReserved = reservedBooks.some((book) => book.id === book_id);
  const allUserBooks: BooksType["id"][] = userSavedBooks?.map(
    (book) => book.id,
  );
  const allFavoriteBooks: BooksType["id"][] = favorieBooks?.map(
    (book) => book.id,
  );

  useEffect(() => {
    const init = async () => {
      if (book_id) {
        getBook();
      }
    };

    init();
  }, [book_id]);

  return (
    <>
      {showModals.checkBookModal !== "disappearModal" && (
        <aside
          onAnimationEnd={() => {
            if (showModals.checkBookModal === "hideModal") {
              setShowModals({
                ...showModals,
                checkBookModal: "disappearModal",
              });
            }
          }}
          className={`${showModals.checkBookModal} flex fixed bottom-0 right-0 flex-col w-62.5 px-8 py-6 h-[calc(100%-var(--nav-height))] bg-[#082030]`}
        >
          <button
            onClick={() => {
              setShowModals({
                ...showModals,
                checkBookModal: "hideModal",
              });
            }}
            className="absolute top-4 left-4 cursor-pointer text-lg"
          >
            <FaArrowRightLong className={` duration-200 text-gray-300`} />
          </button>

          <button className="cursor-pointer">
            {allUserBooks.includes(book_id) ? (
              <FaBookmark
                onClick={() => addBooks(book_id)}
                className="text-yellow-300 hover:text-gray-300 duration-150 text-lg absolute top-4 right-12"
              />
            ) : (
              <FaRegBookmark
                onClick={() => addBooks(book_id)}
                className="text-gray-300 hover:text-yellow-300 duration-150 text-lg absolute top-4 right-12"
              />
            )}
          </button>

          <button className="cursor-pointer">
            {allFavoriteBooks.includes(book_id) ? (
              <FaHeart
                onClick={() => {
                  if (checkBookData) addLike(checkBookData);
                }}
                className={` text-red-500 hover:text-gray-300 duration-150 text-lg absolute top-4 right-4`}
              />
            ) : (
              <FaRegHeart
                onClick={() => {
                  if (checkBookData) addLike(checkBookData);
                }}
                className={` text-gray-300 hover:text-red-500 duration-150 text-lg absolute top-4 right-4`}
              />
            )}
          </button>

          <BookSpecs
            isReserved={isReserved}
            book_id={book_id}
            checkBookData={checkBookData}
            setShowConfirmModal={setShowConfirmModal}
            handleReserveBooks={handleReserveBooks}
          />
        </aside>
      )}
      <ConfirmDelete
        handleDeleteFn={unreserveBook}
        title="this book that is already reserved"
        setHideConfirmDelete={setShowConfirmModal}
        showConfirmDelete={showConfirmModal}
      />
    </>
  );
}

export default CheckBook;
