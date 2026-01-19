import { FaRegBell, FaMagnifyingGlass } from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";

function Nav() {
  const { myProfile, setSearch } = useContextHook();

  return (
    <div className="h-(--nav-height) z-100 w-full relative min-h-(--nav-height) max-h-(--nav-height)">
      <nav className="h-20 fixed w-[calc(100%-var(--aside-width))] gap-4 bg-white flex items-center px-6 shadow">
        <div className="relative flex items-center w-full">
          <input
            placeholder="Search your favorite books"
            className="border outline-blue-300 h-7.5 w-full text-gray-600 border-gray-200 shadow rounded-md pl-4 placeholder:text-sm"
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />
          <FaMagnifyingGlass className="absolute right-2 text-gray-500 text-[14px]" />
        </div>

        <div className="flex relative min-h-7.5 min-w-7.5 items-center cursor-pointer">
          <div className="text-[10px] absolute right-1 top-0 size-4 flex items-center justify-center font-medium bg-red-500 rounded-full text-white">
            5
          </div>
          <FaRegBell className="text-xl" />
        </div>
        <div className="flex gap-1 rounded items-center cursor-pointer">
          <img
            src={`http://localhost:3000/uploads/${myProfile?.avatar_url}`}
            className="size-10 min-w-10 min-h-10 rounded-full bg-gray-300"
          />

          <p className="text-sm font-medium text-gray-700">
            @{myProfile?.username}
          </p>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
