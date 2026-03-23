import React, { createContext, useEffect, useState } from "react";
import type { UsersType } from "../types/usersType";
import type { BooksType } from "../types/booksType";
import type { ToastType } from "../types/toastType";
import { useNavigate } from "react-router-dom";
import type { NotificationsType } from "../types/NotificationsType";
import fetchFunction from "../utils/fetchFunction";
import { loginURL, registerURL } from "../constant/URL";

interface ContexTypeProps {
  children: React.ReactNode;
}

export type ShowModalsType = "showModal" | "hideModal" | "disappearModal";
type ShowModalsState = Record<string, ShowModalsType>;

interface ContextType {
  myProfile: UsersType | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  getUser: () => void;
  logout: () => void;
  setShowModals: React.Dispatch<React.SetStateAction<ShowModalsState>>;
  showModals: ShowModalsState;
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
};

const MainContext = createContext<ContextType>(defaultContextTypes);

export default function MainContextProvider({ children }: ContexTypeProps) {
  const [myProfile, setMyProfile] = useState<UsersType>();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [showModals, setShowModals] = useState<ShowModalsState>({
    notificationModal: "disappearModal",
    checkBookModal: "disappearModal",
    confirmDeleteNotification: "disappearModal",
    showAside: "disappearModal",
  });
  const [checkBookData, setCheckBookData] = useState<BooksType>();
  const [bookId, setBookId] = useState<BooksType["id"]>();
  const [toastType, setToastType] = useState<ToastType>();
  const [notifications, setNotifications] = useState<NotificationsType[]>([]);

  const getUser = async () => {
    try {
      const data = await fetchFunction<UsersType>(
        "http://localhost:3000/user/get",
      );
      setMyProfile(data);
    } catch (err) {
      console.error(err);
      navigate(loginURL);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (location.pathname === loginURL || location.pathname === registerURL)
        return;
      getUser();
    };

    init();
  }, []);

  const createNotification = async (title: string, description: string) => {
    await fetch("http://localhost:3000/notification/create", {
      credentials: "include",
      method: "POSTS",
      body: JSON.stringify({ title, description }),
    });
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

  return (
    <MainContext.Provider
      value={{
        myProfile,
        setSearch,
        getUser,
        logout,
        showModals,
        setShowModals,
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
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export { MainContext };
