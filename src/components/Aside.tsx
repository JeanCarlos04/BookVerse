import { Link } from "react-router-dom";
import {
  FaRegUser,
  FaBook,
  FaRegHeart,
  FaRegCalendarCheck,
} from "react-icons/fa";
import {
  FaHouseChimney,
  FaArrowRightFromBracket,
  FaUserTie,
  FaGear,
  FaArrowLeftLong,
} from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";
import type { IconType } from "react-icons";
import WidthResponsiveHook from "../hooks/widthHook";

function Aside() {
  const { logout, myProfile, setShowModals, showModals } = useContextHook();
  const width = WidthResponsiveHook();

  const handleShowAsideRoutes = (
    title: string,
    route: string,
    Icon: IconType,
  ) => {
    return (
      <li className="py-1 group px-3 rounded duration-200">
        <Link
          to={`/${route}`}
          className=" duration-200 text-gray-200 flex gap-2 items-center"
        >
          <div className="size-6 flex group-hover:bg-blue-500 duration-200 justify-center items-center rounded bg-gray-800">
            {" "}
            <Icon className=" group-hover:text-white text-gray-300 " />
          </div>
          {title}
        </Link>
      </li>
    );
  };

  return (
    <>
      {(width > 1025 || showModals.showAside !== "disappearModal") && (
        <aside
          onAnimationEnd={() => {
            if (showModals.showAside === "hideModal") {
              setShowModals((prev) => ({
                ...prev,
                showAside: "disappearModal",
              }));
            }
          }}
          className={`${showModals.showAside} asideClass fixed z-100 left-0 bg-[#082030] top-0 w-(--aside-width) flex flex-col justify-between h-screen shadow py-6 px-4`}
        >
          <div className="flex flex-col gap-7">
            {width < 1025 && (
              <div
                onClick={() =>
                  setShowModals((prev) => ({ ...prev, showAside: "hideModal" }))
                }
              >
                <FaArrowLeftLong className="top-4 cursor-pointer right-6 absolute text-gray-300 text-lg" />
              </div>
            )}

            <header className="w-full text-center">
              <h1 className="text-xl font-medium cursor-pointer text-gray-200">
                BookVerse
              </h1>
            </header>

            <ul className="flex flex-col gap-4">
              <h2 className="font-medium text-gray-400">Menu</h2>
              {handleShowAsideRoutes("Discover", "", FaHouseChimney)}
              {handleShowAsideRoutes("My books", "userSavedBooks", FaBook)}
              {handleShowAsideRoutes("Favorites", "favoriteBooks", FaRegHeart)}
              {handleShowAsideRoutes(
                "Calendar",
                "calendar",
                FaRegCalendarCheck,
              )}
              {handleShowAsideRoutes("Profile", "profile", FaRegUser)}
              {handleShowAsideRoutes("Settings", "settings", FaGear)}

              {myProfile?.role === "ADMIN" && (
                <> {handleShowAsideRoutes("Admin", "adminPanel", FaUserTie)}</>
              )}
            </ul>
          </div>
          <div
            onClick={logout}
            className="py-1 group px-3 rounded duration-200 text-gray-200 flex gap-2 items-center cursor-pointer"
          >
            <div className="size-6 flex  group-hover:bg-red-500 duration-200 justify-center items-center rounded bg-gray-800">
              {" "}
              <FaArrowRightFromBracket className=" group-hover:text-white text-gray-300" />
            </div>
            Log out
          </div>
        </aside>
      )}
    </>
  );
}

export default Aside;
