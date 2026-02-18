import { FaRegImage, FaBook } from "react-icons/fa6";
import type { UseFormRegister } from "react-hook-form";
import type { SelectPanel } from "../pages/AdminPanel";
import type { FieldErrors } from "react-hook-form";
import type { FormType } from "../pages/AdminPanel";

type CreateBookPanelProps = {
  register: UseFormRegister<FormType>;
  selectPanelFunction: SelectPanel;
  setSearchInputBook: React.Dispatch<React.SetStateAction<string>>;
  errors: FieldErrors<FormType>;
  handleCreateBook: (e?: React.BaseSyntheticEvent) => Promise<void>;
  handleImagePreview: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function CreateBookPanel({
  selectPanelFunction,
  register,
  errors,
  setSearchInputBook,
  handleCreateBook,
  handleImagePreview,
}: CreateBookPanelProps) {
  return (
    <section className=" flex flex-col gap-4">
      <header>
        <h3 className="flex gap-2 items-center text-lg font-medium">
          {selectPanelFunction === "create" ? "Create books" : "Edit books"}{" "}
          <FaBook className="text-gray-600" />
        </h3>
      </header>
      <form onSubmit={handleCreateBook} className="flex flex-col gap-4 w-100">
        {selectPanelFunction === "edit" && (
          <input
            onChange={(e) => setSearchInputBook(e.target.value)}
            placeholder="Search book by title"
            className="border border-gray-200 shadow h-7.5 rounded-md pl-3 text-sm outline-blue-400"
          />
        )}

        <input
          placeholder="Title"
          {...register("title", {
            required: "Title field is required",
          })}
          className="border border-gray-200 shadow h-7.5 rounded-md pl-3 text-sm outline-blue-400"
        />
        {errors.title && (
          <p className="text-red-400 font-medium text-sm">
            {errors.title?.message}
          </p>
        )}

        <textarea
          placeholder="Sinopsis"
          {...register("sinopsis", {
            required: "Sinopsis field is required",
          })}
          className="border min-h-25 pt-2 border-gray-200 shadow h-7.5 rounded-md pl-3 text-sm outline-blue-400"
        />
        {errors.sinopsis && (
          <p className="text-red-400 font-medium text-sm">
            {errors.sinopsis?.message}
          </p>
        )}

        <input
          placeholder="Author"
          {...register("author", {
            required: "Author field is required",
          })}
          className="border border-gray-200 shadow h-7.5 rounded-md pl-3 text-sm outline-blue-400"
        />
        {errors.author && (
          <p className="text-red-400 font-medium text-sm">
            {errors.author?.message}
          </p>
        )}

        <input
          className="hidden"
          id="coverInput"
          type="file"
          {...register("cover", {
            required: "Cover field is required",
            onChange: (e) => handleImagePreview(e),
          })}
        />
        {errors.cover && (
          <p className="text-red-400 font-medium text-sm">
            {errors.cover?.message}
          </p>
        )}

        <label
          htmlFor="coverInput"
          className="border text-gray-500 flex justify-center gap-2 items-center border-gray-200 shadow min-h-7.5 rounded-md pl-3 text-sm outline-blue-400 font-medium py-2 hover:bg-gray-50 duration-200"
        >
          Cover <FaRegImage className="text-xl" />
        </label>
        <button
          className={`${selectPanelFunction === "create" ? "bg-blue-500" : "bg-green-500"} rounded text-white font-medium h-8 shadow`}
        >
          {selectPanelFunction === "create" ? "Create" : "Edit"}
        </button>
      </form>
    </section>
  );
}

export default CreateBookPanel;
