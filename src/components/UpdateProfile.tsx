import { useForm } from "react-hook-form";
import { FaPenToSquare, FaRegImage, FaCamera } from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";
import { useState } from "react";

type FormType = {
  newUsername: string;
  avatar_url: File[];
};

function UpdateProfile() {
  const { register, handleSubmit, reset } = useForm<FormType>();
  const { setToastType, myProfile, getUser } = useContextHook();
  const [hoverImageIcon, setHoverImageIcon] = useState(false);

  const handleUpdateProfile = handleSubmit(async (data: FormType) => {
    const { newUsername, avatar_url } = data;

    const formData = new FormData();

    formData.append("username", newUsername);
    formData.append("avatar", avatar_url[0]);

    const res = await fetch("http://localhost:3000/user/update/profile", {
      credentials: "include",
      method: "PATCH",
      body: formData,
    });

    if (!res) {
      setToastType({
        message: "Couldn't update your profile",
        type: "delete",
        class: "showToast",
      });
    } else {
      setToastType({
        message: "Profile updated",
        type: "add",
        class: "showToast",
      });

      getUser();
      reset();
    }
  });

  return (
    <section className="flex self-center my-4 w-full md:w-112.5 flex-col border border-gray-100 shadow rounded-lg">
      <header className="p-4 flex items-center w-full h-12.5 bg-[#082030] rounded-tl-lg rounded-tr-lg">
        <h2 className="text-white font-medium flex items-center gap-2">
          <FaPenToSquare /> Update profile
        </h2>
      </header>
      <form
        onSubmit={handleUpdateProfile}
        className="py-3 px-4 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4 items-center">
          <p className="font-medium text-gray-700 flex items-center gap-2">
            New avatar <FaCamera />
          </p>
          <label
            aria-label="Update your avatar"
            onMouseEnter={() => setHoverImageIcon(true)}
            onMouseLeave={() => setHoverImageIcon(false)}
            htmlFor="avatar_url_input"
            className="hover:brightness-90 duration-200 rounded-full relative shadow border border-gray-300"
          >
            <div
              className={`absolute inset-0 rounded-full bg-black/40 flex items-center justify-center 
              transition-opacity duration-200 
              ${hoverImageIcon ? "opacity-100" : "opacity-0"}`}
            >
              <FaRegImage className="text-white text-2xl" />
            </div>
            <img
              alt="My profile avatar"
              className="size-24 rounded-full"
              src={`http://localhost:3000/uploads/${myProfile?.avatar_url}`}
            />
          </label>
          <input
            id="avatar_url_input"
            autoComplete="new-avatar"
            type="file"
            {...register("avatar_url")}
            className="hidden"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-gray-700">New username</p>
          <input
            autoComplete="new-username"
            type="text"
            {...register("newUsername")}
            className="rounded-md px-4 h-8 shadow border border-gray-200 outline-blue-400"
          />
        </div>
        <button className="bg-blue-500 shadow w-full h-8.75 rounded text-white font-medium">
          Update
        </button>
      </form>
    </section>
  );
}

export default UpdateProfile;
