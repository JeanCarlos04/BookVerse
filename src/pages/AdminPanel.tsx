import React, { useEffect, useState, useRef } from "react";
import Aside from "../components/Aside";
import Nav from "../components/Nav";
import ToastModal from "../components/UX/ToastModal";
import useContextHook from "../hooks/useContextHook";
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa6";
import fetchFunction from "../utils/fetchFunction";
import type { BooksType } from "../types/booksType";
import ConfirmDelete from "../components/UX/ConfirmDelete";
import CreateBookPanel from "../components/CreateBookPanel";
import DeleteBookPanel from "../components/DeleteBookPanel";

export type FormType = {
  title: string;
  sinopsis: string;
  cover: File[];
  author: string;
};

export type SelectPanel = "create" | "delete" | "edit";

export function AdminPanel() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectPanelFunction, setSelectPanelFunction] =
    useState<SelectPanel>("create");
  const [searchInputBook, setSearchInputBook] = useState("");
  const [foundedBook, setFoundedBook] = useState<BooksType>();
  const { myProfile } = useContextHook();
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined,
  );
  const {
    register,
    reset,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>();
  const refTimeout = useRef(0);

  if (myProfile?.role !== "ADMIN") return null;

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

  // eslint-disable-next-line react-hooks/rules-of-hooks
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
    const { title, sinopsis, author, cover } = data;

    const formData = new FormData();

    formData.append("title", title);
    formData.append("sinopsis", sinopsis);
    formData.append("author", author);
    formData.append("cover", cover[0]);

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
    <>
      <main className="flex h-screen w-full bg-gray-50">
        <Aside />
        <div className="w-full">
          <Nav />

          <div className="flex items-center flex-col pt-8 px-36 gap-4">
            <header className="flex gap-3 w-full justify-center py-3 bg-white rounded shadow">
              <h1 className="text-xl  font-medium">Admin Panel</h1>

              <select
                className="bg-gray-50 rounded border border-gray-100 shadow px-2"
                onChange={(e) =>
                  setSelectPanelFunction(e.target.value as SelectPanel)
                }
              >
                <option value="create">Create</option>
                <option value="delete">Delete</option>
                <option value="edit">Edit</option>
              </select>
            </header>

            <div className="flex gap-8 items-center px-4 py-4 bg-white shadow h-fit w-full justify-center rounded-xl">
              {handlePanel()}
              <section className="flex flex-col gap-4 w-58">
                <header className="text-lg font-medium flex items-center gap-2">
                  Books Visualizer <FaRegEye className="text-gray-600" />
                </header>

                <div className="flex flex-col gap-3 px-6 bg-[#082030] rounded-md py-4">
                  <img
                    src={imagePreview}
                    className="w-50 h-75 rounded-md shadow bg-gray-300"
                  />
                  <h2 className="text-center font-medium text-lg text-white">
                    {watch("title") || "The best example."}
                  </h2>
                  <h3 className="text-center text-yellow-400 text-sm">
                    {watch("author") || "Jhon Doe"}
                  </h3>

                  <p className="text-center text-sm text-gray-200">
                    {watch("sinopsis") ||
                      `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius, labore, sequi aperiam illo.`}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>

        <ConfirmDelete
          setHideConfirmDelete={setShowConfirmModal}
          showConfirmDelete={showConfirmModal}
          title={`${foundedBook?.title}`}
          handleDeleteFn={() => handleDeleteBook(foundedBook?.id)}
        />
        <ToastModal />
      </main>
    </>
  );
}

export default AdminPanel;
