import { useContext } from "react";
import { BooksContext } from "../context/BookContext";

function useBookContext() {
  const useBookContext = useContext(BooksContext);

  return useBookContext;
}

export default useBookContext;
