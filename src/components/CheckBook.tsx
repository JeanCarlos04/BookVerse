import {
  FaBookBookmark,
  FaArrowRightLong,
  FaRegHeart,
  FaRegBookmark,
  FaBookmark,
  FaHeart,
} from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";
import { useEffect } from "react";
import type { BooksType } from "../types/booksType";

type CheckBookProps = {
  book_id: BooksType["id"];
};

function CheckBook({ book_id }: CheckBookProps) {
  const {
    setShowModals,
    showModals,
    addLike,
    addBooks,
    userBooks,
    favorieBooks,
    setCheckBookData,
    checkBookData,
  } = useContextHook();

  const getBook = async () => {
    const res = await fetch(`http://localhost:3000/books/get/${book_id}`, {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setCheckBookData(data);
    }
  };

  const allUserBooks: BooksType["id"][] = userBooks?.map((book) => book.id);

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

          <section className="w-full h-full flex flex-col justify-center items-center gap-4">
            <img
              className="w-50 rounded"
              src={`http://localhost:3000/uploads/${checkBookData?.cover}`}
            />
            <div className="flex flex-col gap-4 w-fit">
              <div className="flex flex-col gap-1">
                <p className="font-medium text-lg text-white text-center">
                  {checkBookData?.title}
                </p>
                <h2 className="text-center text-sm text-yellow-400">
                  {checkBookData?.author}
                </h2>
              </div>
              <div className="flex justify-center items-center gap-4 text-sm font-medium">
                <div className="flex gap-1 text-center text-gray-300">
                  <h3>{checkBookData?.likes}</h3>
                  <label>Likes</label>
                </div>

                <div className="flex gap-1 text-center text-gray-300">
                  <h3>{checkBookData?.pages}</h3>
                  <label>Pages</label>
                </div>
              </div>
              <p className="text-gray-300 text-sm text-center">
                {checkBookData?.sinopsis}
              </p>
            </div>

            <button className="hover:bg-gray-100 duration-150 font-medium w-full bg-[#ffffff] flex items-center gap-2 justify-center text-black py-1 rounded-md cursor-pointer">
              <FaBookBookmark /> Reserve
            </button>
          </section>
        </aside>
      )}
    </>
  );
}

export default CheckBook;
