import Aside from "../components/Aside";
import {
  FaGear,
  FaLock,
  FaAngleRight,
  FaArrowRightFromBracket,
  FaPenToSquare,
} from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";
import ToastModal from "../components/UX/ToastModal";
import ChangePassword from "../components/ChangePassword";
import UpdateProfile from "../components/UpdateProfile";
import { useState } from "react";

type SettingsType = "updateProfile" | "changePassword" | "closed";

function Settings() {
  const { logout } = useContextHook();
  const [selectSetting, setSelectSetting] = useState<SettingsType>("closed");

  return (
    <main className="flex w-full h-full">
      <Aside />
      <div className="w-full h-screen flex flex-col gap-4 px-12 py-12">
        <header>
          <h1 className="font-medium text-2xl text-gray-800 flex items-center gap-2">
            Settings <FaGear />
          </h1>
        </header>
        <ul className="p-4 flex flex-col gap-3">
          <li
            onClick={() => {
              return selectSetting === "closed"
                ? setSelectSetting("updateProfile")
                : setSelectSetting("closed");
            }}
            className="group cursor-pointer hover:bg-gray-50 duration-200 font-medium text-gray-600 p-3 pl-4 shadow rounded-md border border-gray-100 flex items-center justify-between"
          >
            <div className="flex items-center gap-2 group-hover:translate-x-3 duration-200">
              <FaPenToSquare /> Update profile
            </div>{" "}
            <FaAngleRight />
          </li>
          {selectSetting === "updateProfile" && <UpdateProfile />}

          <li
            onClick={() => {
              return selectSetting === "closed"
                ? setSelectSetting("changePassword")
                : setSelectSetting("closed");
            }}
            className="group cursor-pointer hover:bg-gray-50 duration-200 font-medium text-gray-600 p-3 pl-4 shadow rounded-md border border-gray-100 flex items-center justify-between"
          >
            <div className="flex items-center gap-2 group-hover:translate-x-3 duration-200">
              <FaLock /> Change password
            </div>{" "}
            <FaAngleRight />
          </li>
          {selectSetting === "changePassword" && <ChangePassword />}

          <li
            onClick={() => logout()}
            className="group cursor-pointer hover:bg-gray-50 duration-200 font-medium text-gray-600 p-3 pl-4 shadow rounded-md border border-gray-100 flex items-center justify-between"
          >
            <div className="flex items-center gap-2 group-hover:translate-x-3 duration-200">
              <FaArrowRightFromBracket /> Log out
            </div>{" "}
            <FaAngleRight />
          </li>
        </ul>
      </div>

      <ToastModal />
    </main>
  );
}

export default Settings;
