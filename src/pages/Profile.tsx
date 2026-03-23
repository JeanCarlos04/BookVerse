import CheckBook from "../components/CheckBook";
import useContextHook from "../hooks/useContextHook";
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
import type { IconType } from "react-icons";

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
      setBooksSection([]);

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

  const profileButtons = (
    profileSection: SectionSelector,
    Icon: IconType,
    title: string,
  ) => {
    return (
      <button
        onClick={() => setSelectSection(profileSection)}
        className={`font-medium ${selectSection === `${profileSection}` ? "text-blue-500" : "text-gray-700 hover:text-gray-500"} duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap`}
      >
        <Icon /> {title}
      </button>
    );
  };

  return (
    <main className="flex justify-center w-full h-screen xl:pl-(--aside-width)">
      <section className="xl:p-12 md:px-8 px-4 pt-8 gap-8 flex w-full flex-col items-center">
        <header>
          <h1 className="text-2xl font-medium">
            {myProfile?.username}'s profile
          </h1>
        </header>
        <div className="flex flex-col gap-2 items-center">
          <img
            alt="My profile avatar"
            className="size-24 rounded-full border-2 border-gray-200"
            src={`http://localhost:3000/uploads/${myProfile?.avatar_url}`}
          />
          <p className="text-lg font-medium">@{myProfile?.username}</p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <div className="md:flex grid grid-cols-2 rounded-md justify-center content-center place-items-center md:h-10 xl:gap-28 md:gap-16 gap-4 bg-gray-50 w-full h-auto md:py-0 py-2">
            {profileButtons("reserved", FaBookBookmark, "Reserved books")}
            {profileButtons("liked", FaRegHeart, "Liked books")}
            {profileButtons("saved", FaRegCalendarCheck, "Saved Books")}
            {profileButtons("history", FaRegClock, "Books history")}
          </div>

          {booksSection.length > 0 ? (
            <>
              {selectSection === "history" ? (
                <HistoryProfileSection
                  setBookId={setBookId}
                  booksSection={booksSection as HistoryBooksType[]}
                />
              ) : (
                <div className="w-full h-full p-4 xl:px-8 px-4 grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-y-6 bg-gray-50">
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
    </main>
  );
}

export default Profile;
