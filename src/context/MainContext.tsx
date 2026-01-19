import { createContext, useEffect, useState, useRef } from "react";
import type { UsersType } from "../types/usersType";
import type { BooksType } from "../types/booksType";
import { useNavigate } from "react-router-dom";

interface ContexTypeProps {
  children: React.ReactNode;
}

type ShowModalsType = "showModal" | "hideModal" | "disappearModal";
type ShowModalsState = Record<string, ShowModalsType>;

interface ContextType {
  myProfile: UsersType | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  books: BooksType[];
  getUser: () => void;
  logout: () => void;
  setShowModals: React.Dispatch<React.SetStateAction<ShowModalsState>>;
  showModals: ShowModalsState;
  addLike: (book_id: BooksType) => void;
  addBooks: (book_id: number) => void;
  userBooks: BooksType[];
  favorieBooks: BooksType[];
  setCheckBookData: React.Dispatch<React.SetStateAction<BooksType | undefined>>;
  checkBookData: BooksType | undefined;
}

const defaultContextTypes = {
  myProfile: undefined,
  setSearch: () => {},
  books: [],
  getUser: () => {},
  logout: () => {},
  setShowModals: () => {},
  showModals: {
    checkBookModal: "disappearModal",
  } as ShowModalsState,
  addLike: () => {},
  addBooks: () => {},
  userBooks: [],
  favorieBooks: [],
  setCheckBookData: () => {},
  checkBookData: undefined,
};

const MainContext = createContext<ContextType>(defaultContextTypes);

export default function MainContextProvider({ children }: ContexTypeProps) {
  const [myProfile, setMyProfile] = useState<UsersType>();
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<BooksType[]>([]);
  const timeRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const navigate = useNavigate();
  const [userBooks, setUserBooks] = useState<BooksType[]>([]);
  const [favorieBooks, setFavoriteBooks] = useState<BooksType[]>([]);
  const [showModals, setShowModals] = useState<ShowModalsState>({
    checkBookModal: "disappearModal",
  });
  const [checkBookData, setCheckBookData] = useState<BooksType>();

  console.log(books);

  const getUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/user/get", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setMyProfile(data);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getUserBooks = async () => {
    const res = await fetch("http://localhost:3000/user/books/get", {
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      setUserBooks(data);
    }
  };

  const getUserFavoriteBooks = async () => {
    const res = await fetch("http://localhost:3000/user/books/get/liked", {
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      setFavoriteBooks(data);
    }
  };

  useEffect(() => {
    const init = async () => {
      await Promise.all([getUser(), getUserBooks(), getUserFavoriteBooks()]);
    };

    init();
  }, []);

  const searchBooks = async (search: string) => {
    const params = new URLSearchParams();
    params.set("search", search);

    const res = await fetch(
      `http://localhost:3000/books/search?${params.toString()}`,
      { credentials: "include" },
    );

    if (res.ok) {
      const data = await res.json();
      setBooks(data);
    }
  };

  useEffect(() => {
    if (timeRef.current) clearTimeout(timeRef.current);

    timeRef.current = setTimeout(() => {
      searchBooks(search);
    }, 500);

    return () => {
      clearTimeout(timeRef.current);
    };
  }, [search]);

  const addLike = async (book_id: BooksType) => {
    setFavoriteBooks((prev) => {
      const exist = prev.some((book) => book.id === book_id.id);
      if (exist) {
        setCheckBookData((previo) => {
          if (previo) return { ...previo, likes: book_id.likes - 1 };
        });
        return prev.filter((book) => book.id !== book_id.id);
      } else {
        setCheckBookData((previo) => {
          if (previo) return { ...previo, likes: book_id.likes + 1 };
        });
        return [...prev, book_id];
      }
    });

    await fetch(`http://localhost:3000/user/books/like/${book_id.id}`, {
      credentials: "include",
      method: "POST",
    });
  };

  const addBooks = async (book_id: BooksType["id"]) => {
    const res = await fetch(`http://localhost:3000/user/books/add/${book_id}`, {
      credentials: "include",
      method: "POST",
    });

    if (res.ok) {
      getUserBooks();
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

  return (
    <MainContext.Provider
      value={{
        myProfile,
        setSearch,
        books,
        getUser,
        logout,
        showModals,
        setShowModals,
        addLike,
        addBooks,
        userBooks,
        favorieBooks,
        checkBookData,
        setCheckBookData,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export { MainContext };
