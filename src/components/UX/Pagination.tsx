import type { BooksType } from "../../types/booksType";

type PaginationProps = {
  booksPerPage: number;
  booksLength: BooksType[];
  firstIndex: number;
  lastIndex: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination({
  booksPerPage,
  booksLength,
  setCurrentPage,
}: PaginationProps) {
  const buttonIndex = Math.ceil(booksLength.length / booksPerPage);
  const buttons = Array.from({ length: buttonIndex });

  return (
    <>
      {booksLength.length > booksPerPage && (
        <section className=" flex gap-3 w-full justify-center items-center">
          {buttons.map((_, index) => {
            return (
              <div
                onClick={() => setCurrentPage(index)}
                key={index}
                className="flex min-h-8 w-8 items-center justify-center h-fit rounded-md font-medium text-white bg-blue-500"
              >
                {index}
              </div>
            );
          })}
        </section>
      )}
    </>
  );
}

export default Pagination;
