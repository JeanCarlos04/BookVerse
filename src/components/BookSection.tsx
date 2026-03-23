import type { IconType } from "react-icons";
import { FaArrowDown, FaArrowRightLong, FaArrowUp } from "react-icons/fa6";
import EmptySection from "./UX/EmpySection";
import type { BooksType } from "../types/booksType";
import { Link } from "react-router-dom";
import type { SectionType } from "../types/sectionType";
import BookSkeleton from "./UX/BooksSkeleton";
import { useState } from "react";

interface BookSectionProps {
  children: React.ReactNode;
  title: string;
  TitleIcon: IconType | null;
  iconColor?: string;
  onShowMore?: () => void;
  onShowLess?: () => void;
  books: BooksType[];
  booksPerPage: number;
  sectionType: SectionType;
  booksLoading: boolean | string | undefined;
}

function BookSection({
  children,
  title,
  TitleIcon,
  iconColor,
  onShowMore,
  onShowLess,
  books,
  sectionType,
  booksLoading,
  booksPerPage,
}: BookSectionProps) {
  const [isShowingMore, setIsShowingMore] = useState(false);

  return (
    <div className="xl:px-12 md:px-6 px-4 md:py-6 py-4 bg-gray-100">
      <section className="xl:px-8 md:px-6 px-4 h-fit bg-white border border-gray-100 rounded-xl flex flex-col gap-6 py-4">
        <header className="flex items-center justify-between">
          <h1 className="font-medium md:text-xl flex items-center gap-3">
            {title} {TitleIcon && <TitleIcon style={{ color: iconColor }} />}
          </h1>

          {books.length > 10 && (
            <Link
              to={`/bookSection/${sectionType}`}
              className="bg-blue-500/15 px-3 gap-2 h-7.5 rounded md:text-sm text-xs flex items-center font-medium text-blue-400"
            >
              View all <FaArrowRightLong />
            </Link>
          )}
        </header>

        {booksLoading === true ? (
          <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-y-6 gap-x-8 w-full h-full">
            {Array.from({ length: 5 }).map((position) => {
              return (
                <div key={Number(position)}>
                  <BookSkeleton />
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {booksLoading === "empty" ? (
              <EmptySection message="No books to show." />
            ) : (
              <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-y-6 gap-x-8">
                {children}
              </div>
            )}
          </>
        )}

        <div className="flex items-center gap-12 justify-center">
          {books.length > booksPerPage && (
            <button
              onClick={() => {
                if (onShowMore) onShowMore();
                setIsShowingMore(true);
              }}
              className="font-medium cursor-pointer self-center flex items-center gap-2 text-gray-400 rounded-md h-8.75 text-sm hover:text-gray-500 duration-150 text-center w-fit"
            >
              Show More
              <FaArrowDown className="self-center text-sm" />
            </button>
          )}

          {isShowingMore && (
            <button
              onClick={() => {
                if (onShowLess) onShowLess();
                setIsShowingMore(false);
              }}
              className=" font-medium cursor-pointer self-center flex items-center gap-2 text-gray-400 rounded-md h-8.75 text-sm hover:text-gray-500 duration-150 text-center w-fit"
            >
              Hide <FaArrowUp className="self-center text-sm" />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default BookSection;
