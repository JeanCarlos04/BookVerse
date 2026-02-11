import type { IconType } from "react-icons";
import { FaArrowDownLong, FaArrowRightLong } from "react-icons/fa6";
import EmptySection from "./UX/EmpySection";
import useContextHook from "../hooks/useContextHook";
import type { BooksType } from "../types/booksType";
import { Link } from "react-router-dom";
import type { SectionType } from "../types/sectionType";

interface BookSectionProps {
  children: React.ReactNode;
  title: string;
  TitleIcon: IconType | null;
  iconColor?: string;
  onShowMore?: () => void;
  books: BooksType[];
  booksPerPage: number;
  sectionType: SectionType;
}

function BookSection({
  children,
  title,
  TitleIcon,
  iconColor,
  onShowMore,
  books,
  booksPerPage,
  sectionType,
}: BookSectionProps) {
  const { setBookSectionData } = useContextHook();

  return (
    <div className="px-12 py-6 bg-gray-100">
      <section className="px-8 h-fit bg-white rounded-xl flex flex-col gap-6 py-4">
        <header className="flex items-center justify-between">
          <h1 className="font-medium text-xl flex items-center gap-3">
            {title} {TitleIcon && <TitleIcon style={{ color: iconColor }} />}
          </h1>

          {books.length > booksPerPage && (
            <Link
              to={`/bookSection/${sectionType}`}
              onClick={() => {
                setBookSectionData({ title, children, icon: TitleIcon, books });
              }}
              className="bg-blue-500/15 px-3 gap-2 h-7.5 rounded text-sm flex items-center font-medium text-blue-400"
            >
              View all <FaArrowRightLong />
            </Link>
          )}
        </header>

        {books.length <= 0 ? (
          <EmptySection message="No books to show." />
        ) : (
          <div className="grid grid-cols-5 gap-y-6 gap-x-8">{children}</div>
        )}

        {books.length > booksPerPage && (
          <button
            onClick={onShowMore}
            className=" font-medium cursor-pointer self-center flex items-center gap-2 text-gray-400 rounded-md h-8.75 text-sm hover:text-gray-500 duration-150 text-center w-fit"
          >
            Show More <FaArrowDownLong className="self-center text-sm" />
          </button>
        )}
      </section>
    </div>
  );
}

export default BookSection;
