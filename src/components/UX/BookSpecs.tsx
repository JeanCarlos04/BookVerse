import type { BooksType } from "../../types/booksType";
import { FaBookBookmark } from "react-icons/fa6";

type BookSpecs = {
  book_id?: BooksType["id"];
  checkBookData: BooksType | undefined;
  isReserved?: boolean;
  setShowConfirmModal?: (value: React.SetStateAction<boolean>) => void;
  handleReserveBooks?: (book_id: number, expires_in: Date) => void;
};

function BookSpecs({
  checkBookData,
  isReserved,
  handleReserveBooks,
  setShowConfirmModal,
  book_id,
}: BookSpecs) {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-4">
      <img
        alt={`${checkBookData?.cover} image`}
        className="w-50 rounded"
        src={`http://localhost:3000/uploads/${checkBookData?.cover}`}
      />
      <div className="flex flex-col gap-4 w-fit">
        <div className="flex flex-col gap-1">
          <p className="font-medium text-lg text-white text-center">
            {checkBookData?.title}
          </p>
          <h2 className="text-center text-sm text-yellow-400">
            {checkBookData?.author}
          </h2>
        </div>
        <div className="flex justify-center items-center gap-4 text-sm font-medium">
          <div className="flex gap-1 text-center text-gray-300">
            <h3>{checkBookData?.likes}</h3>
            <p>Likes</p>
          </div>

          <div className="flex gap-1 text-center text-gray-300">
            <h3>{checkBookData?.pages}</h3>
            <p>Pages</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm text-center">
          {checkBookData?.sinopsis}
        </p>
      </div>

      {setShowConfirmModal && handleReserveBooks && book_id && (
        <button
          onClick={() => {
            if (isReserved) {
              setShowConfirmModal(true);
              return null;
            } else {
              handleReserveBooks(
                book_id,
                new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              );
            }
          }}
          className={`${isReserved ? "bg-green-500 hover:bg-green-600 text-white" : "bg-[#ffffff] hover:bg-gray-100"}  duration-150 font-medium w-full  flex items-center gap-2 justify-center text-black py-1 rounded-md cursor-pointer`}
        >
          <FaBookBookmark /> {isReserved ? "Reserved" : "Reserve"}
        </button>
      )}
    </section>
  );
}

export default BookSpecs;
