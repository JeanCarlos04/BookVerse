import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import useContextHook from "./hooks/useContextHook";
import Nav from "./components/Nav";
import Aside from "./components/Aside";
import ToastModal from "./components/UX/ToastModal";
import { loginURL, registerURL } from "./constant/URL";

// ANIMATIONS STYLES

import "./styles/asideAnimation.css";
import "./styles/modalsAnimations.css";
import "./styles/toastAnimation.css";
import "./styles/SkeletonsAnimation.css";

// PAGES

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const SavedBooks = lazy(() => import("./pages/SavedBooks"));
const FavoriteBooks = lazy(() => import("./pages/FavoriteBook"));
const Calender = lazy(() => import("./pages/Calendar"));
const ShowSpecificSection = lazy(() => import("./pages/ShowSpecificSection"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));

// ADMIN PANEL

const AdminPanel = lazy(() => import("./pages/AdminPanel"));

function App() {
  const { myProfile } = useContextHook();

  return (
    <>
      {location.pathname !== loginURL && location.pathname !== registerURL && (
        <>
          <Nav />
          <Aside />
        </>
      )}

      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`${loginURL}`} element={<Login />} />
          <Route path={`${registerURL}`} element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userSavedBooks" element={<SavedBooks />} />
          <Route path="/favoriteBooks" element={<FavoriteBooks />} />
          <Route path="/calendar" element={<Calender />} />
          <Route path="/calendar" element={<Calender />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/bookSection/:sectionType"
            element={<ShowSpecificSection />}
          />
          {myProfile?.role === "ADMIN" ? (
            <Route path="/adminPanel" element={<AdminPanel />} />
          ) : null}
        </Routes>
      </Suspense>
      <ToastModal />
    </>
  );
}

export default App;
