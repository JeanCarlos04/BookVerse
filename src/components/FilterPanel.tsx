import { useState } from "react";
import { FaArrowRotateLeft } from "react-icons/fa6";
import type { ShowModalsType } from "../context/MainContext";
import useContextHook from "../hooks/useContextHook";

import { useForm } from "react-hook-form";

type FilterPanelProps = {
  filterPanelClass: ShowModalsType;
  setFilterPanelClaas: React.Dispatch<React.SetStateAction<ShowModalsType>>;
};

type FormType = {
  title: string;
  author: string;
  categories: string[];
};

function FilterPanel({
  filterPanelClass,
  setFilterPanelClaas,
}: FilterPanelProps) {
  const { setFilteredSectionBooks } = useContextHook();
  const { register, handleSubmit, reset } = useForm<FormType>();
  const [categoriesApplied, setCategoriesApplied] = useState<string[]>([]);
  const [genres, setGenres] = useState<Record<string, boolean>>({
    Fantasy: false,
    "Science Fiction": false,
    Mystery: false,
    Romance: false,
    Horror: false,
    Adventure: false,
    Dystopian: false,
    "Self-help": false,
    Programming: false,
    Technology: false,
    History: false,
    Biography: false,
    Finance: false,
    Psychology: false,
    Business: false,
  });

  const handleApplyFilter = handleSubmit(async (data: FormType) => {
    const { title, author } = data;

    const res = await fetch("http://localhost:3000/books/filteredBooks", {
      credentials: "include",
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: title,
        author: author,
        categories: categoriesApplied,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setFilteredSectionBooks(data);
    }
  });

  return (
    <section
      onAnimationEnd={(e) => {
        if (e.animationName === "scaleDown") {
          setFilterPanelClaas("disappearModal");
        }
      }}
      className={`${filterPanelClass === "showModal" ? "showFilterPanel" : "hideFilterPanel"} bg-white shadow-md top-10 right-0 absolute rounded-md w-84 p-4 border border-gray-200 z-100 flex flex-col gap-2`}
    >
      <header className="flex items-center justify-between">
        <p className="font-medium text-lg text-gray-800">Filter options</p>{" "}
        <button
          onClick={() => {
            reset();
            setCategoriesApplied(() => []);
            setFilteredSectionBooks([]);
            setGenres((prev) =>
              Object.fromEntries(
                Object.entries(prev).map(([key]) => [key, false]),
              ),
            );
          }}
          className="flex items-center gap-1 px-3 h-7.5 bg-gray-100 cursor-pointer rounded text-gray-700"
        >
          <FaArrowRotateLeft /> Reset
        </button>
      </header>
      <form onSubmit={handleApplyFilter} className="flex flex-col gap-4">
        <input
          {...register("title")}
          className="border border-gray-200 shadow h-7.5 rounded-md pl-3 text-sm outline-blue-400"
          placeholder="By title"
        />
        <input
          {...register("author")}
          className="border border-gray-200 shadow h-7.5 rounded-md pl-3 text-sm outline-blue-400"
          placeholder="By author"
        />

        <div className="flex gap-1 flex-col">
          <h2 className="text font-medium text-gray-800">Categories</h2>

          <div className="grid grid-cols-3 gap-y-5">
            {Object.keys(genres).map((genre) => {
              return (
                <div key={genre} className="flex items-center gap-2">
                  <input
                    checked={genres[genre]}
                    onChange={() => {
                      setGenres((prev) => ({ ...prev, [genre]: !prev[genre] }));
                      if (categoriesApplied.includes(genre)) {
                        setCategoriesApplied((prev) =>
                          prev.filter((categorie) => categorie !== genre),
                        );
                      } else {
                        setCategoriesApplied((prev) => [...prev, genre]);
                      }
                    }}
                    id={`categorie${genre}`}
                    type="checkbox"
                    className="hidden peer"
                  />
                  <label
                    aria-label="Select book categorie"
                    htmlFor={`categorie${genre}`}
                    className="peer-checked:bg-green-400 peer-checked:border-green-500 rounded-xs border border-gray-400 shadow min-w-3 min-h-3 size-3"
                  ></label>
                  <p className="text-sm">{genre}</p>
                </div>
              );
            })}
          </div>
        </div>
        <button className="cursor-pointer hover:bg-blue-500 duration-200 w-full px-4 h-7 bg-blue-400 text-white rounded font-medium flex items-center justify-center text-sm">
          Apply
        </button>
      </form>
    </section>
  );
}

export default FilterPanel;
