import React, { useEffect, useState, useRef } from "react";
import useContextHook from "../hooks/useContextHook";
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa6";
import fetchFunction from "../utils/fetchFunction";
import type { BooksType } from "../types/booksType";
import ConfirmDelete from "../components/UX/ConfirmDelete";
import CreateBookPanel from "../components/CreateBookPanel";
import DeleteBookPanel from "../components/DeleteBookPanel";
import type { BooksCategoriesTypes } from "../types/booksType";
import BookSpecs from "../components/UX/BookSpecs";

export type FormType = {
  title: string;
  sinopsis: string;
  cover: File[];
  author: string;
  pages: number;
  categories: BooksCategoriesTypes;
};

export type SelectPanel = "create" | "delete" | "edit";

export function AdminPanel() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectPanelFunction, setSelectPanelFunction] =
    useState<SelectPanel>("create");
  const [searchInputBook, setSearchInputBook] = useState("");
  const [foundedBook, setFoundedBook] = useState<BooksType>();
  const { myProfile } = useContextHook();
  const [categoriesApplied, setCategoriesApplied] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined,
  );
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>();
  const refTimeout = useRef(0);

  const getBook = async () => {
    if (!searchInputBook) return;

    const param = new URLSearchParams({
      title: searchInputBook,
    });

    const data = await fetchFunction<BooksType>(
      `http://localhost:3000/books/getByTitle?${param.toString()}`,
    );
    setFoundedBook(data);
  };

  useEffect(() => {
    if (selectPanelFunction === "create") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFoundedBook(undefined);
    }
  }, [selectPanelFunction, setFoundedBook]);

  useEffect(() => {
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
    }

    refTimeout.current = setTimeout(() => {
      getBook();
    }, 500);

    return () => {
      clearTimeout(refTimeout.current);
    };
  }, [searchInputBook]);

  if (myProfile?.role !== "ADMIN") return null;

  const handleDeleteBook = async (book_id: BooksType["id"] | undefined) => {
    if (!book_id) return;
    await fetch(`http://localhost:3000/books/delete/${book_id}`, {
      credentials: "include",
      method: "DELETE",
    });
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const convertedFile = URL.createObjectURL(file);
    setImagePreview(convertedFile);
  };

  const handleCreateBook = handleSubmit(async (data: FormType) => {
    const { title, sinopsis, author, cover, pages } = data;

    const formData = new FormData();

    formData.append("title", title);
    formData.append("sinopsis", sinopsis);
    formData.append("author", author);
    formData.append("cover", cover[0]);
    formData.append("pages", JSON.stringify(pages));
    formData.append("categories", JSON.stringify(categoriesApplied));

    if (!categoriesApplied.length) return null;

    if (selectPanelFunction === "create") {
      await fetch("http://localhost:3000/books/create", {
        credentials: "include",
        method: "POST",
        body: formData,
      });
    } else if (selectPanelFunction === "edit") {
      await fetch(`http://localhost:3000/books/update/${foundedBook?.id}`, {
        credentials: "include",
        method: "PATCH",
        body: formData,
      });
    }

    reset();
  });

  const handlePanel = () => {
    if (selectPanelFunction === "create" || selectPanelFunction === "edit") {
      return (
        <CreateBookPanel
          categoriesApplied={categoriesApplied}
          setCategoriesApplied={setCategoriesApplied}
          handleImagePreview={handleImagePreview}
          selectPanelFunction={selectPanelFunction}
          register={register}
          errors={errors}
          handleCreateBook={handleCreateBook}
          setSearchInputBook={setSearchInputBook}
        />
      );
    } else if (selectPanelFunction === "delete") {
      return (
        <DeleteBookPanel
          setSearchInputBook={setSearchInputBook}
          setShowConfirmModal={setShowConfirmModal}
        />
      );
    }
  };

  return (
    <main className="flex h-[calc(100vh-var(--nav-height))] justify-center w-full bg-gray-50 xl:pl-(--aside-width)">
      <div className="flex w-full h-fit items-center flex-col py-8 xl:px-12 px-6 gap-4">
        <header className="flex gap-3 w-full justify-center py-3 bg-white rounded shadow">
          <h1 className="text-xl  font-medium">Admin Panel</h1>

          <select
            className="bg-gray-50 rounded border border-gray-100 shadow px-2"
            onChange={(e) =>
              setSelectPanelFunction(e.target.value as SelectPanel)
            }
          >
            <option className="text-xs xl:text-base" value="create">
              Create
            </option>
            <option className="text-xs xl:text-base" value="delete">
              Delete
            </option>
            <option className="text-xs xl:text-base" value="edit">
              Edit
            </option>
          </select>
        </header>

        <div className="flex md:flex-row items-center md:items-start flex-col gap-8 xl:gap-16 px-4 py-4 bg-white shadow h-fit w-full justify-center rounded-xl">
          {handlePanel()}
          <section className="flex items-center flex-col gap-4 w-58">
            <header className="text-lg font-medium flex items-center gap-2">
              Books Visualizer <FaRegEye className="text-gray-600" />
            </header>

            <div className="flex flex-col gap-3 px-6 bg-[#082030] rounded-md py-4">
              <BookSpecs
                imagePreview={imagePreview}
                checkBookData={foundedBook}
              />
            </div>
          </section>
        </div>
      </div>

      <ConfirmDelete
        setHideConfirmDelete={setShowConfirmModal}
        showConfirmDelete={showConfirmModal}
        title={`${foundedBook?.title}`}
        handleDeleteFn={() => handleDeleteBook(foundedBook?.id)}
      />
    </main>
  );
}

export default AdminPanel;
