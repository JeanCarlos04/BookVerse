import { useState, useMemo } from "react";
import useContextHook from "../hooks/useContextHook";
import type { HistoryBooksType } from "../types/booksType";
import EmptySection from "./UX/EmpySection";

type HistoryProfileSectionProps = {
  booksSection: HistoryBooksType[];
  setBookId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

type HistorySection = "reserved" | "expired" | "returned" | "all";

function HistoryProfileSection({
  booksSection,
  setBookId,
}: HistoryProfileSectionProps) {
  const { showModals, setShowModals } = useContextHook();
  const [historySection, setHistorySection] = useState<HistorySection>("all");
  const booksFiltered = useMemo(() => {
    return booksSection.filter((book) => book.status_type === historySection);
  }, [booksSection, historySection]);

  const booksToUse = historySection === "all" ? booksSection : booksFiltered;

  const dates = useMemo(() => {
    const arrayDate = new Set<string>();
    booksToUse.forEach((book) => {
      arrayDate.add(new Date(book.created_at).toLocaleDateString());
    });

    return Array.from(arrayDate);
  }, [booksToUse]);

  return (
    <div className="flex gap-4 flex-col w-full">
      <div className="md:flex grid grid-cols-2 gap-2 xl:gap-10 md:gap-6 py-2 justify-center text-gray-700">
        <button
          onClick={() => setHistorySection("all")}
          className={`font-medium px-4 py-1 ${historySection === "all" ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-700"} bg-border border-gray-300 shadow rounded cursor-pointer`}
        >
          All
        </button>
        <button
          onClick={() => setHistorySection("reserved")}
          className={`font-medium px-4 py-1 ${historySection === "reserved" ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-700"} bg-border border-gray-300 shadow rounded cursor-pointer`}
        >
          Reserved books
        </button>
        <button
          onClick={() => setHistorySection("expired")}
          className={`font-medium px-4 py-1 ${historySection === "expired" ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-700"} bg-border border-gray-300 shadow rounded cursor-pointer`}
        >
          Expired books
        </button>
        <button
          onClick={() => setHistorySection("returned")}
          className={`font-medium px-4 py-1 ${historySection === "returned" ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-700"} bg-border border-gray-300 shadow rounded cursor-pointer`}
        >
          Returned books
        </button>
      </div>
      {booksSection.length <= 0 ||
      (booksFiltered.length <= 0 && historySection !== "all") ? (
        <div className="py-8 w-full bg-gray-50">
          <EmptySection message="No books to show" />
        </div>
      ) : (
        <div className="bg-gray-50 py-5">
          {dates.map((date) => {
            return (
              <div key={date}>
                <p className="text-lg text-center font-medium ">{date}</p>
                <div className="w-full h-full py-5 gap-y-5 xl:px-8 px-4 grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 bg-gray-50 relative">
                  {(historySection === "all"
                    ? booksSection
                    : booksFiltered
                  ).map((book) => {
                    if (
                      new Date(book.created_at)
                        .toLocaleDateString()
                        .toString() !== date
                    )
                      return;

                    return (
                      <div
                        key={book.id}
                        className="flex flex-col gap-2 items-center"
                      >
                        <article
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
                            <h2 className="font-medium overflow-hidden text-nowrap text-[14px] text-ellipsis">
                              {book?.title}
                            </h2>
                            <h3 className="text-gray-600 text-[13px]">
                              {book?.author}
                            </h3>
                          </div>
                        </article>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HistoryProfileSection;
