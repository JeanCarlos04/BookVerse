import useContextHook from "../hooks/useContextHook";
import useBookContext from "../hooks/useBookContext";
import Pagination from "../components/UX/Pagination";
import EmptySection from "../components/UX/EmpySection";
import { useEffect, useState } from "react";
import type { BooksType } from "../types/booksType";
import { useParams } from "react-router-dom";
import CheckBook from "../components/CheckBook";
import { FaFilter } from "react-icons/fa6";
import type { ShowModalsType } from "../context/MainContext";
import FilterPanel from "../components/FilterPanel";
import type { SectionType } from "../types/sectionType";

function ShowSpecificSection() {
  const [showFilterPanel, setShowFilterPanel] =
    useState<ShowModalsType>("disappearModal");
  const [bookSection, setBookSection] = useState<BooksType[]>([]);
  const { sectionType } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 10;
  const firstIndex = currentPage * booksPerPage;
  const lastIndex = firstIndex + booksPerPage;

  const { setBookId, setShowModals, showModals, search, bookId } =
    useContextHook();

  const { filteredSectionBooks } = useBookContext();

  const handleShowBooks = filteredSectionBooks?.length
    ? filteredSectionBooks
    : bookSection;

  const handleGetSectionBook = async () => {
    const API_URLs: Record<SectionType | string, string> = {
      recommended_books: "/books/search",
      most_liked_books: "/books/get/mostLiked",
      favorite_books: "/user/books/get/liked",
      reserved_books: "/user/books/get/reserved",
      saved_books: "/user/books/get",
      most_saved_books: "/books/mostSaved",
      most_reserved_books: "/books/mostReserved",
      because_you_liked_books: "",
    };

    const params = new URLSearchParams();
    params.set("search", search);

    if (sectionType) {
      const URL = API_URLs[sectionType];

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
    }
  };

  useEffect(() => {
    const init = async () => {
      handleGetSectionBook();
    };

    init();
  }, []);

  return (
    <main className="flex w-full h-full xl:pl-(--aside-width)">
      <div className="xl:px-12 w-full px-6 py-6 bg-gray-100">
        <section className="xl:px-8 md:px-6 px-4 h-fit bg-white rounded-xl flex flex-col gap-6 py-4">
          <header className="flex items-center justify-between">
            <h1 className="font-medium md:text-xl flex items-center gap-3 capitalize">
              {sectionType?.replaceAll("_", " ")}
            </h1>
            <div className="relative">
              <button
                onClick={() =>
                  showFilterPanel === "showModal"
                    ? setShowFilterPanel("hideModal")
                    : setShowFilterPanel("showModal")
                }
                className="cursor-pointer hover:bg-gray-200 duration-200 flex items-center gap-2 font-medium text-gray-600 px-3 h-8.25 bg-gray-100 rounded-md"
              >
                <FaFilter /> <p className="text-sm">Filter</p>
              </button>
              {showFilterPanel !== "disappearModal" && (
                <FilterPanel
                  filterPanelClass={showFilterPanel}
                  setFilterPanelClaas={setShowFilterPanel}
                />
              )}
            </div>
          </header>
          <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-y-6 gap-x-8">
            {handleShowBooks.length > 0 && (
              <>
                {(filteredSectionBooks.length > 0
                  ? filteredSectionBooks
                  : bookSection
                )
                  ?.slice(firstIndex, lastIndex)
                  .map((book) => {
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
                        className="group flex flex-col shadow w-38 md:w-50 p-4 rounded gap-2 hover:-translate-y-2.5 duration-200 cursor-pointer"
                      >
                        <img
                          alt={`${book.cover} image`}
                          className="w-full rounded"
                          src={`http://localhost:3000/uploads/${book?.cover}`}
                        />
                        <div className="flex flex-col gap-1">
                          <h2 className="font-medium overflow-hidden text-nowrap text-xs md:text-[14px] text-ellipsis">
                            {book?.title}
                          </h2>
                          <h3 className="text-gray-600 text-xs md:text-[13px]">
                            {book?.author}
                          </h3>
                        </div>
                      </article>
                    );
                  })}
              </>
            )}
          </div>

          {handleShowBooks.length <= 0 && (
            <EmptySection message="No books to show." />
          )}

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            firstIndex={firstIndex}
            lastIndex={lastIndex}
            booksPerPage={booksPerPage}
            booksLength={handleShowBooks}
          />
        </section>
      </div>

      {bookId && showModals.checkBookModal && <CheckBook book_id={bookId} />}
    </main>
  );
}

export default ShowSpecificSection;
