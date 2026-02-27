import type { BooksType } from "../../types/booksType";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

type PaginationProps = {
  booksPerPage: number;
  booksLength: BooksType[];
  firstIndex: number;
  lastIndex: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination({
  booksPerPage,
  booksLength,
  setCurrentPage,
  currentPage,
}: PaginationProps) {
  const buttonIndex = Math.ceil(booksLength.length / booksPerPage);
  const buttons = Array.from({ length: buttonIndex });

  return (
    <>
      {booksLength.length > booksPerPage && (
        <section className=" flex gap-3 w-full justify-center items-center">
          <button
            onClick={() =>
              currentPage > 0 ? setCurrentPage(currentPage - 1) : null
            }
            className="cursor-pointer hover:text-gray-700"
          >
            <FaAngleLeft />
          </button>
          {buttons.map((_, index) => {
            return (
              <div
                onClick={() => setCurrentPage(index)}
                key={index}
                className={`cursor-pointer flex min-h-8 w-8 items-center justify-center h-fit rounded-md font-medium  ${currentPage === index ? "bg-blue-500 text-white" : "bg-white text-gray-600 border border-gray-300 shadow-sm"} `}
              >
                {index + 1}
              </div>
            );
          })}
          <button
            onClick={() =>
              currentPage < buttons.length - 1
                ? setCurrentPage(currentPage + 1)
                : null
            }
            className="cursor-pointer hover:text-gray-700"
          >
            <FaAngleRight />
          </button>
        </section>
      )}
    </>
  );
}

export default Pagination;
