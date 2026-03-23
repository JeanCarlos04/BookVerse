import { FaRegBell, FaMagnifyingGlass, FaBars } from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";
import Notifications from "./Notifications";
import { Link } from "react-router-dom";
import WidthResponsiveHook from "../hooks/widthHook";

function Nav() {
  const { myProfile, setSearch, setShowModals, showModals, notifications } =
    useContextHook();

  const width = WidthResponsiveHook();

  return (
    <div className="h-(--nav-height) xl:pl-(--aside-width) z-100 w-full relative min-h-(--nav-height) max-h-(--nav-height)">
      <nav className="h-20 fixed w-full xl:w-[calc(100%-var(--aside-width))] gap-2 md:gap-4 bg-white flex items-center px-4 xl:px-6 shadow">
        <div className="relative flex gap-2 items-center w-full">
          {width < 1025 && (
            <button
              onClick={() =>
                setShowModals((prev) => ({
                  ...prev,
                  showAside:
                    showModals.showAside === "showModal"
                      ? "hideModal"
                      : "showModal",
                }))
              }
            >
              <FaBars className="text-lg text-gray-600" />
            </button>
          )}
          <input
            placeholder="Search books"
            className="border outline-blue-300 h-7.5 w-full text-gray-600 border-gray-200 shadow rounded-md md:pl-4 pl-2 placeholder:text-sm"
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />
          <FaMagnifyingGlass className="absolute right-2 text-gray-500 text-[14px]" />
        </div>

        <div
          onClick={() => {
            setShowModals({
              ...showModals,
              notificationModal:
                showModals.notificationModal === "showModal"
                  ? "hideModal"
                  : "showModal",
            });
          }}
          className="flex relative min-h-7.5 min-w-7.5 items-center cursor-pointer"
        >
          {notifications.length > 0 && (
            <div className="text-[10px] absolute right-1 top-0 size-4 flex items-center justify-center font-medium bg-red-500 rounded-full text-white">
              {notifications.length}
            </div>
          )}
          <FaRegBell className="text-xl" />
        </div>
        <Link to={"/profile"}>
          <div className="flex gap-1 md:hover:bg-gray-100 rounded-md duration-200 md:px-3 md:py-1 items-center cursor-pointer">
            <img
              alt="My profile avatar"
              src={`http://localhost:3000/uploads/${myProfile?.avatar_url}`}
              className="size-10 min-w-10 min-h-10 rounded-full bg-gray-300 border border-gray-300"
            />

            <p className="text-sm font-medium text-gray-700">
              @{myProfile?.username}
            </p>
          </div>
        </Link>
        <Notifications />
      </nav>
    </div>
  );
}

export default Nav;
