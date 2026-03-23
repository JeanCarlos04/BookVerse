import type { BooksType } from "../../types/booksType";
import { FaBookBookmark } from "react-icons/fa6";

type BookSpecs = {
  book_id?: BooksType["id"];
  checkBookData: BooksType | undefined;
  isReserved?: boolean;
  setShowConfirmModal?: (value: React.SetStateAction<boolean>) => void;
  handleReserveBooks?: (book_id: number, expires_in: Date) => void;
  imagePreview?: string;
};

function BookSpecs({
  checkBookData,
  isReserved,
  handleReserveBooks,
  setShowConfirmModal,
  book_id,
  imagePreview,
}: BookSpecs) {
  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-4">
      <img
        alt={`${checkBookData?.cover} image`}
        className="w-50 h-75 rounded"
        src={
          checkBookData?.cover
            ? `http://localhost:3000/uploads/${checkBookData?.cover}`
            : imagePreview
              ? imagePreview
              : "/imgs/coverDefault.jpg"
        }
      />
      <div className="flex flex-col gap-4 w-fit">
        <div className="flex flex-col gap-1">
          <p className="font-medium text-lg text-white text-center">
            {checkBookData?.title ?? "Title example."}
          </p>
          <h2 className="text-center text-sm text-yellow-400">
            {checkBookData?.author ?? "Jhon Doe"}
          </h2>
        </div>
        <div className="flex justify-center items-center gap-4 text-sm font-medium">
          <div className="flex gap-1 text-center text-gray-300">
            <p> {`${checkBookData?.likes ?? "50"}`} Likes</p>
          </div>

          <div className="flex gap-1 text-center text-gray-300">
            <p>{checkBookData?.pages ?? "50"} Pages</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm text-center">
          {checkBookData?.sinopsis ??
            `Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eius, labore, sequi aperiam illo.`}
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
