import type { IconType } from "react-icons";
import { FaArrowDownLong } from "react-icons/fa6";

interface BookSectionProps {
  children: React.ReactNode;
  title: string;
  TitleIcon: IconType;
  iconColor?: string;
  onShowMore: () => void;
  booksLength: number;
}

function BookSection({
  children,
  title,
  TitleIcon,
  iconColor,
  onShowMore,
  booksLength,
}: BookSectionProps) {
  return (
    <div className="px-12 py-6 bg-gray-100">
      <section className="px-8 h-fit bg-white rounded-xl flex flex-col gap-6 py-4">
        <header>
          <h1 className="font-medium text-xl flex items-center gap-3">
            {title} <TitleIcon style={{ color: iconColor }} />
          </h1>
        </header>

        <div className="grid grid-cols-5 gap-y-6 gap-x-8">{children}</div>
        {booksLength > 15 && (
          <button
            onClick={onShowMore}
            className=" font-medium w-50 cursor-pointer self-center flex items-center gap-2 text-gray-400 rounded-md h-8.75 text-sm hover:text-gray-600 duration-150"
          >
            Show More <FaArrowDownLong className="self-center text-sm" />
          </button>
        )}
      </section>
    </div>
  );
}

export default BookSection;
