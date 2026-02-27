import React, { createContext, useEffect, useState } from "react";
import type { UsersType } from "../types/usersType";
import type { BooksReservedType, BooksType } from "../types/booksType";
import type { ToastType } from "../types/toastType";
import { useNavigate } from "react-router-dom";
import type { NotificationsType } from "../types/NotificationsType";
import fetchFunction from "../utils/fetchFunction";
import fetchBooksFunction from "../utils/fetchBooksFunction";

interface ContexTypeProps {
  children: React.ReactNode;
}

export type IsSectionEmpty = {
  generalBooks: string | boolean | undefined;
  userFavoriteBooks: string | boolean | undefined;
  userReservedBooks: string | boolean | undefined;
  userSavedBooks: string | boolean | undefined;
};

export type ShowModalsType = "showModal" | "hideModal" | "disappearModal";
type ShowModalsState = Record<string, ShowModalsType>;

interface ContextType {
  myProfile: UsersType | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  getUser: () => void;
  logout: () => void;
  setShowModals: React.Dispatch<React.SetStateAction<ShowModalsState>>;
  showModals: ShowModalsState;
  addLike: (book_id: BooksType) => void;
  addBooks: (book_id: number) => void;
  userSavedBooks: BooksType[];
  favorieBooks: BooksType[];
  setCheckBookData: React.Dispatch<React.SetStateAction<BooksType | undefined>>;
  checkBookData: BooksType | undefined;
  setBookId: React.Dispatch<React.SetStateAction<number | undefined>>;
  bookId: number | undefined;
  search: string;
  setToastType: React.Dispatch<React.SetStateAction<ToastType | undefined>>;
  toastType: ToastType | undefined;
  createNotification: (title: string, description: string) => void;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationsType[]>>;
  notifications: NotificationsType[];
  setBooksPerPage: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  booksPerPage: Record<string, number>;
  handleReserveBooks: (book_id: number, expires_in: Date) => void;
  reservedBooks: BooksReservedType[];
  booksLoading: IsSectionEmpty;
  setBooksLoading: React.Dispatch<React.SetStateAction<IsSectionEmpty>>;
  getUserSavedBooks: () => void;
  getUserReservedBooks: () => void;
  getUserFavoriteBooks: () => void;
  setFilteredSectionBooks: React.Dispatch<React.SetStateAction<BooksType[]>>;
  filteredSectionBooks: BooksType[];
}

const defaultContextTypes = {
  myProfile: undefined,
  setSearch: () => {},
  getUser: () => {},
  logout: () => {},
  setShowModals: () => {},
  showModals: {
    checkBookModal: "disappearModal",
  } as ShowModalsState,
  addLike: () => {},
  addBooks: () => {},
  userSavedBooks: [],
  favorieBooks: [],
  setCheckBookData: () => {},
  checkBookData: undefined,
  setBookId: () => {},
  bookId: undefined,
  search: "",
  setToastType: () => {},
  toastType: undefined,
  createNotification: () => {},
  setNotifications: () => {},
  notifications: [],
  setBooksPerPage: () => {},
  booksPerPage: {},
  handleReserveBooks: () => {},
  reservedBooks: [],
  booksLoading: {
    generalBooks: undefined,
    userFavoriteBooks: undefined,
    userReservedBooks: undefined,
    userSavedBooks: undefined,
  },
  setBooksLoading: () => {},
  getUserSavedBooks: () => {},
  getUserReservedBooks: () => {},
  getUserFavoriteBooks: () => {},
  setFilteredSectionBooks: () => {},
  filteredSectionBooks: [],
};

const MainContext = createContext<ContextType>(defaultContextTypes);

export default function MainContextProvider({ children }: ContexTypeProps) {
  const [myProfile, setMyProfile] = useState<UsersType>();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [userSavedBooks, setUserSavedBooks] = useState<BooksType[]>([]);
  const [favorieBooks, setFavoriteBooks] = useState<BooksType[]>([]);
  const [showModals, setShowModals] = useState<ShowModalsState>({
    notificationModal: "disappearModal",
    checkBookModal: "disappearModal",
    confirmDeleteNotification: "disappearModal",
  });
  const [checkBookData, setCheckBookData] = useState<BooksType>();
  const [bookId, setBookId] = useState<BooksType["id"]>();
  const [toastType, setToastType] = useState<ToastType>();
  const [notifications, setNotifications] = useState<NotificationsType[]>([]);
  const [booksPerPage, setBooksPerPage] = useState<Record<string, number>>({
    reccommendedPerPage: 10,
    mostLikedPerPage: 10,
    savedBooksPerPage: 10,
    favoriteBooksPerPage: 10,
    reservedBooksPerPage: 10,
  });
  const [reservedBooks, setReservedBooks] = useState<BooksReservedType[]>([]);
  const [booksLoading, setBooksLoading] = useState<IsSectionEmpty>({
    generalBooks: false,
    userFavoriteBooks: false,
    userReservedBooks: false,
    userSavedBooks: false,
  });
  const [filteredSectionBooks, setFilteredSectionBooks] = useState<BooksType[]>(
    [],
  );

  const getUser = async () => {
    try {
      const data = await fetchFunction<UsersType>(
        "http://localhost:3000/user/get",
      );
      setMyProfile(data);
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  };

  const getUserSavedBooks = async () => {
    try {
      const data = await fetchBooksFunction<BooksType[]>(
        "http://localhost:3000/user/books/get",
        setBooksLoading,

        "userSavedBooks",
      );

      setUserSavedBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserReservedBooks = async () => {
    try {
      const data = await fetchBooksFunction<BooksReservedType[]>(
        "http://localhost:3000/user/books/get/reserved",
        setBooksLoading,

        "userReservedBooks",
      );

      setReservedBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserFavoriteBooks = async () => {
    try {
      const data = await fetchBooksFunction<BooksReservedType[]>(
        "http://localhost:3000/user/books/get/liked",
        setBooksLoading,

        "userFavoriteBooks",
      );

      setFavoriteBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const init = async () => {
      getUser();
    };

    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      if (!myProfile) return;
      await Promise.all([
        getUserSavedBooks(),
        getUserFavoriteBooks(),
        getUserReservedBooks(),
      ]);
    };

    init();
  }, [myProfile]);

  const addLike = async (book_id: BooksType) => {
    setFavoriteBooks((prev) => {
      const exist = prev.some((book) => book.id === book_id.id);
      if (exist) {
        setToastType({ type: "delete", message: "Book unliked" });
        setCheckBookData((previo) => {
          if (previo) return { ...previo, likes: book_id.likes - 1 };
        });
        return prev.filter((book) => book.id !== book_id.id);
      } else {
        setCheckBookData((previo) => {
          if (previo) return { ...previo, likes: book_id.likes + 1 };
        });
        setToastType({ type: "add", message: "Book liked" });
        return [...prev, book_id];
      }
    });

    await fetch(`http://localhost:3000/user/books/like/${book_id.id}`, {
      credentials: "include",
      method: "POST",
    });
  };

  const createNotification = async (title: string, description: string) => {
    await fetch("http://localhost:3000/notification/create", {
      credentials: "include",
      method: "POSTS",
      body: JSON.stringify({ title, description }),
    });
  };

  const addBooks = async (book_id: BooksType["id"]) => {
    const res = await fetch(`http://localhost:3000/user/books/add/${book_id}`, {
      credentials: "include",
      method: "POST",
    });

    if (res.ok) {
      getUserSavedBooks();
    }
  };

  const logout = async () => {
    const res = await fetch("http://localhost:3000/user/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      navigate("/login");
    }
  };

  const handleReserveBooks = async (
    book_id: BooksType["id"],
    expires_in: Date,
  ) => {
    const res = await fetch(
      `http://localhost:3000/user/books/reserve/${book_id}`,
      {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ expires_in }),
      },
    );

    if (res.ok) {
      setToastType({ type: "add", message: "Book reserved successfully" });
    }
  };

  return (
    <MainContext.Provider
      value={{
        myProfile,
        setSearch,
        getUser,
        logout,
        showModals,
        setShowModals,
        addLike,
        addBooks,
        userSavedBooks,
        favorieBooks,
        checkBookData,
        setCheckBookData,
        bookId,
        setBookId,
        search,
        toastType,
        setToastType,
        createNotification,
        notifications,
        setNotifications,
        booksPerPage,
        setBooksPerPage,
        handleReserveBooks,
        reservedBooks,
        booksLoading,
        setBooksLoading,
        getUserSavedBooks,
        getUserReservedBooks,
        getUserFavoriteBooks,
        filteredSectionBooks,
        setFilteredSectionBooks,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export { MainContext };
