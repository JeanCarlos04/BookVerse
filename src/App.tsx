import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Practica from "./pages/Practica";
import "./styles/modalsAnimations.css";
import "./styles/toastAnimation.css";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const SavedBooks = lazy(() => import("./pages/SavedBooks"));
const FavoriteBooks = lazy(() => import("./pages/FavoriteBook"));

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/practica" element={<Practica />} />
        <Route path="/userSavedBooks" element={<SavedBooks />} />
        <Route path="/favoriteBooks" element={<FavoriteBooks />} />
      </Routes>
    </Suspense>
  );
}

export default App;
