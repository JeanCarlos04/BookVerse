import { Link } from "react-router-dom";
import {
  FaRegUser,
  FaBook,
  FaRegHeart,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { FaHouseChimney, FaArrowRightFromBracket } from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";

function Aside() {
  const { logout } = useContextHook();

  return (
    <div className="w-(--aside-width) max-w-50 min-w-50">
      <aside className="fixed z-100 left-0 bg-[#082030] top-0 w-(--aside-width) flex flex-col justify-between h-screen shadow py-6 px-4">
        <div className="flex flex-col gap-7">
          <header className="w-full text-center">
            <h1 className="text-xl font-medium cursor-pointer text-gray-200">
              BookVerse
            </h1>
          </header>

          <ul className="flex flex-col gap-4">
            <h2 className="font-medium text-gray-400">Menu</h2>
            <li className="py-1 group px-3 rounded duration-200">
              <Link
                to={"/"}
                className=" duration-200 text-gray-200 flex gap-2 items-center"
              >
                <div className="size-6 flex group-hover:bg-blue-500 duration-200 justify-center items-center rounded bg-gray-800">
                  {" "}
                  <FaHouseChimney className=" group-hover:text-white text-gray-300 " />
                </div>
                Discover
              </Link>
            </li>

            <li className="py-1 group px-3 rounded duration-200">
              <Link
                to={"/userSavedBooks"}
                className=" duration-200 text-gray-200 flex gap-2 items-center"
              >
                <div className="size-6 flex group-hover:bg-blue-500 duration-200 justify-center items-center rounded bg-gray-800">
                  {" "}
                  <FaBook className=" group-hover:text-white text-gray-300" />
                </div>
                My books
              </Link>
            </li>
            <li className="py-1 group px-3 rounded duration-200">
              <Link
                to={"/favoriteBooks"}
                className=" duration-200 text-gray-200 flex gap-2 items-center"
              >
                <div className="size-6 flex group-hover:bg-blue-500 duration-200 justify-center items-center rounded bg-gray-800">
                  {" "}
                  <FaRegHeart className=" group-hover:text-white text-gray-300" />
                </div>
                Favorites
              </Link>
            </li>
            <li className="py-1 group px-3 rounded duration-200">
              <Link
                to={"/calendar"}
                className=" duration-200 text-gray-200 flex gap-2 items-center"
              >
                <div className="size-6 flex group-hover:bg-blue-500 duration-200 justify-center items-center rounded bg-gray-800">
                  {" "}
                  <FaRegCalendarCheck className=" group-hover:text-white text-gray-300" />
                </div>
                Calendar
              </Link>
            </li>
            <li className="py-1 group px-3 rounded duration-200">
              <Link
                to={"/profile"}
                className=" duration-200 text-gray-200 flex gap-2 items-center"
              >
                <div className="size-6 flex group-hover:bg-blue-500 duration-200 justify-center items-center rounded bg-gray-800">
                  {" "}
                  <FaRegUser className=" group-hover:text-white text-gray-300" />
                </div>
                Profile
              </Link>
            </li>

            <li className="py-1 px-4">
              <Link to={"/Profile"}></Link>
            </li>
            <li className="py-1 px-4">
              <Link to={"/Profile"}></Link>
            </li>
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
    </div>
  );
}

export default Aside;
