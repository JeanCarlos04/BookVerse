import type { BooksType } from "../types/booksType";
import useContextHook from "../hooks/useContextHook";

interface ShowingBooksProps {
  bookData: BooksType[];
  booksPerPage: number;
}

function ShowingBooks({ bookData, booksPerPage }: ShowingBooksProps) {
  const { setShowModals, showModals, setBookId } = useContextHook();
  return (
    <>
      {bookData.length > 0 && (
        <>
          {bookData?.slice(0, booksPerPage).map((book) => {
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
                  <h3 className="text-gray-600 text-[13px]">{book?.author}</h3>
                </div>
              </article>
            );
          })}
        </>
      )}
    </>
  );
}

export default ShowingBooks;
