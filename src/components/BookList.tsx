import useContextHook from "../hooks/useContextHook";
import type { BooksType } from "../types/booksType";
import CheckBook from "./CheckBook";
import { useState } from "react";

function BookList() {
  const { books, showModals, setShowModals } = useContextHook();
  const [bookId, setBookId] = useState<BooksType["id"]>();

  const categories = {
    adventure: false ,
    action: false,
    horror: false,
  };

  const activeCategories = Object.entries(categories)
    .filter(([, value]) => value)
    .map(([key]) => key);

  const filterBooks = books.filter((book) => {
    if (activeCategories.length === 0) return true;

    return activeCategories.every((category) =>
      book.categories?.includes(category),
    );
  });

  return (
    <>
      <div className="px-12 py-6 bg-gray-100">
        <section className="px-8 h-fit bg-white rounded-xl flex flex-col gap-4 py-4">
          <header>
            <h1 className="font-medium text-xl">Recommended</h1>
          </header>

          <div className="grid grid-cols-5 gap-y-6 gap-x-8">
            {books.length > 0 && (
              <>
                {filterBooks?.slice(0, 10).map((book) => {
                  return (
                    <article
                      key={book.id}
                      onClick={() => {
                        setBookId(book.id);
                        setShowModals({
                          ...showModals,
                          checkBookModal: "showModal",
                        });
                      }}
                      className="group flex flex-col shadow w-50 p-4 rounded gap-2 hover:-translate-y-2.5 duration-200 cursor-pointer"
                    >
                      <img
                        className="w-full rounded"
                        src={`http://localhost:3000/uploads/${book?.cover}`}
                      />
                      <div className="flex flex-col gap-1">
                        <h2 className="font-medium overflow-hidden text-nowrap text-[14px] text-ellipsis">
                          {book?.title}
                        </h2>
                        <h3 className="text-gray-600 text-[13px]">
                          {book?.author}
                        </h3>
                      </div>
                    </article>
                  );
                })}
              </>
            )}
          </div>
        </section>
      </div>
      {bookId && showModals.checkBookModal && (
        <>{<CheckBook book_id={bookId} />}</>
      )}
    </>
  );
}

export default BookList;
