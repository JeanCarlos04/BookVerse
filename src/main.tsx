import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import MainContextProvider from "./context/MainContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { BooksContextProvider } from "./context/BookContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MainContextProvider>
        <BooksContextProvider>
          <App />
        </BooksContextProvider>
      </MainContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
