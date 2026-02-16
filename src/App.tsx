import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import useContextHook from "./hooks/useContextHook";

// ANIMATIONS STYLES

import "./styles/modalsAnimations.css";
import "./styles/toastAnimation.css";

// PAGES

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const SavedBooks = lazy(() => import("./pages/SavedBooks"));
const FavoriteBooks = lazy(() => import("./pages/FavoriteBook"));
const Calender = lazy(() => import("./pages/Calendar"));
const ShowSpecificSection = lazy(() => import("./pages/ShowSpecificSection"));

// ADMIN PANEL

const AdminPanel = lazy(() => import("./pages/AdminPanel"));

function App() {
  const { myProfile } = useContextHook();

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userSavedBooks" element={<SavedBooks />} />
        <Route path="/favoriteBooks" element={<FavoriteBooks />} />
        <Route path="/calendar" element={<Calender />} />
        <Route path="/calendar" element={<Calender />} />
        <Route
          path="/bookSection/:sectionType"
          element={<ShowSpecificSection />}
        />
        {myProfile?.role === "ADMIN" ? (
          <Route path="/adminPanel" element={<AdminPanel />} />
        ) : null}
      </Routes>
    </Suspense>
  );
}

export default App;
