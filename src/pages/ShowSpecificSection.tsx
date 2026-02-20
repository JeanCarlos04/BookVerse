import Aside from "../components/Aside";
import Nav from "../components/Nav";
import ToastModal from "../components/UX/ToastModal";
import useContextHook from "../hooks/useContextHook";
import Pagination from "../components/UX/Pagination";
import EmptySection from "../components/UX/EmpySection";
import { useEffect, useState } from "react";
import type { BooksType } from "../types/booksType";
import { useParams } from "react-router-dom";
import CheckBook from "../components/CheckBook";

function ShowSpecificSection() {
  const [bookSection, setBookSection] = useState<BooksType[]>([]);
  const { sectionType } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 10;
  const firstIndex = currentPage * booksPerPage;
  const lastIndex = firstIndex + booksPerPage;

  const {
    bookSectionData,
    setBookId,
    setShowModals,
    showModals,
    search,
    bookId,
  } = useContextHook();

  const handleGetSectionBook = async () => {
    const params = new URLSearchParams();
    params.set("search", search);

    const URL =
      sectionType === "recommendedBooks"
        ? "/books/search"
        : sectionType === "mostLikedBooks"
          ? "/books/get/mostLiked"
          : sectionType === "favoriteBooks"
            ? "/user/books/get/liked"
            : sectionType === "reservedBooks"
              ? "/user/books/get/reserved"
              : "/user/books/get";

    const res = await fetch(
      `http://localhost:3000${URL}?${params.toString()}`,
      {
        credentials: "include",
      },
    );

    if (res.ok) {
      const data = await res.json();
      setBookSection(data);
    }
  };

  useEffect(() => {
    const init = async () => {
      handleGetSectionBook();
    };

    init();
  }, []);

  return (
    <main className="flex w-full h-full">
      <Aside />
      <div className="w-full">
        <Nav />

        <div className="px-12 py-6 bg-gray-100">
          <section className="px-8 h-fit bg-white rounded-xl flex flex-col gap-6 py-4">
            <header className="flex items-center justify-between">
              <h1 className="font-medium text-xl flex items-center gap-3">
                {bookSectionData.title}{" "}
                {bookSectionData.icon && <bookSectionData.icon />}
              </h1>
            </header>
            <div className="grid grid-cols-5 gap-y-6 gap-x-8">
              {bookSection.length > 0 && (
                <>
                  {bookSection?.slice(firstIndex, lastIndex).map((book) => {
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

            {bookSection.length <= 0 && (
              <EmptySection message="No books to show." />
            )}

            <Pagination
              setCurrentPage={setCurrentPage}
              firstIndex={firstIndex}
              lastIndex={lastIndex}
              booksPerPage={booksPerPage}
              booksLength={bookSection}
            />
          </section>
        </div>
      </div>

      {bookId && showModals.checkBookModal && <CheckBook book_id={bookId} />}
      <ToastModal />
    </main>
  );
}

export default ShowSpecificSection;
