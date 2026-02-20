import Aside from "../components/Aside";
import Nav from "../components/Nav";
import CheckBook from "../components/CheckBook";
import useContextHook from "../hooks/useContextHook";
import ToastModal from "../components/UX/ToastModal";
import fetchFunction from "../utils/fetchFunction";
import type {
  BooksType,
  BooksReservedType,
  HistoryBooksType,
} from "../types/booksType";
import {
  FaRegHeart,
  FaBookBookmark,
  FaRegCalendarCheck,
  FaRegClock,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import HistoryProfileSection from "../components/HistoryProfileSection";
import EmptySection from "../components/UX/EmpySection";

type SectionSelector = "reserved" | "liked" | "saved" | "history";

function Profile() {
  const [bookId, setBookId] = useState<BooksType["id"]>();
  const { showModals, myProfile, setShowModals } = useContextHook();
  const [selectSection, setSelectSection] =
    useState<SectionSelector>("reserved");
  const [booksSection, setBooksSection] = useState<
    BooksType[] | BooksReservedType[] | HistoryBooksType[]
  >([]);

  const API_BASE_URL = "http://localhost:3000";

  useEffect(() => {
    const handleGetBooksBySection = async () => {
      const URL: Record<string, string> = {
        reserved: "/user/books/get/reserved",
        liked: "/user/books/get/liked",
        saved: "/user/books/get",
        history: "/user/history/get",
      };

      const books = await fetchFunction<BooksType[] | BooksReservedType[]>(
        `${API_BASE_URL}${URL[selectSection]}`,
      );

      setBooksSection(books);
    };

    handleGetBooksBySection();
  }, [selectSection]);

  return (
    <main className="flex w-full h-screen">
      <Aside />
      <div className="w-full">
        <Nav />

        <section className="p-12 pt-8 gap-8 flex flex-col items-center">
          <header>
            <h1 className="text-2xl font-medium">
              {myProfile?.username}'s profile
            </h1>
          </header>
          <div className="flex flex-col gap-2 items-center">
            <img
              className="size-24 rounded-full"
              src={`http://localhost:3000/uploads/${myProfile?.avatar_url}`}
            />
            <p className="text-lg font-medium">@{myProfile?.username}</p>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <div className="flex rounded-md justify-center h-10 gap-28 bg-gray-50 w-full">
              <button
                onClick={() => setSelectSection("reserved")}
                className={`font-medium ${selectSection === "reserved" ? "text-blue-500" : "text-gray-700 hover:text-gray-500"} duration-200 cursor-pointer flex items-center gap-2`}
              >
                <FaBookBookmark /> Reserved Books
              </button>
              <button
                onClick={() => setSelectSection("liked")}
                className={`font-medium ${selectSection === "liked" ? "text-blue-500" : "text-gray-700 hover:text-gray-500"} duration-200 cursor-pointer flex items-center gap-2`}
              >
                <FaRegHeart />
                Liked Books
              </button>
              <button
                onClick={() => setSelectSection("saved")}
                className={`font-medium ${selectSection === "saved" ? "text-blue-500" : "text-gray-700 hover:text-gray-500"} duration-200 cursor-pointer flex items-center gap-2`}
              >
                <FaRegCalendarCheck /> Saved Books
              </button>
              <button
                onClick={() => setSelectSection("history")}
                className={`font-medium ${selectSection === "history" ? "text-blue-500" : "text-gray-700 hover:text-gray-500"} duration-200 cursor-pointer flex items-center gap-2`}
              >
                <FaRegClock /> History
              </button>
            </div>

            {booksSection.length > 0 ? (
              <>
                {selectSection === "history" ? (
                  <HistoryProfileSection
                    setBookId={setBookId}
                    booksSection={booksSection as HistoryBooksType[]}
                  />
                ) : (
                  <div className="w-full h-full p-4 px-8 grid grid-cols-4 bg-gray-50">
                    {booksSection.map((book) => {
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
                  </div>
                )}
              </>
            ) : (
              <div className="pt-12">
                <EmptySection message="No books to show" />
              </div>
            )}
          </div>
        </section>

        {bookId && showModals.checkBookModal && <CheckBook book_id={bookId} />}
      </div>

      <ToastModal />
    </main>
  );
}

export default Profile;
