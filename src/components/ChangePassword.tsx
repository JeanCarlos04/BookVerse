import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";

type FormType = {
  newPassword: string;
  currentPassword: string;
};

function ChangePassword() {
  const { register, handleSubmit, reset } = useForm<FormType>();
  const { setToastType } = useContextHook();

  const changePassword = handleSubmit(async (data: FormType) => {
    const { currentPassword, newPassword } = data;

    const res = await fetch("http://localhost:3000/user/change/password", {
      credentials: "include",
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        newPassword,
        currentPassword,
      }),
    });

    if (!res) {
      setToastType({
        message: "Couldn't change password",
        type: "delete",
        class: "showToast",
      });
    } else {
      setToastType({
        message: "Password Changed",
        type: "add",
        class: "showToast",
      });

      reset();
    }
  });

  return (
    <section className="flex self-center my-4 w-112.5 flex-col border border-gray-100 shadow rounded-lg">
      <header className="p-4 flex items-center w-full h-12.5 bg-[#082030] rounded-tl-lg rounded-tr-lg">
        <h2 className="text-white font-medium flex items-center gap-2">
          <FaLock /> Change password
        </h2>
      </header>
      <form onSubmit={changePassword} className="py-3 px-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="font-medium text-gray-700">Current password</p>
          <input
            autoComplete="new-password"
            type="password"
            {...register("currentPassword", {
              required: "This field is required",
            })}
            className="rounded-md px-4 h-8 shadow border border-gray-200 outline-blue-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium text-gray-700">New password</p>
          <input
            autoComplete="current-password"
            type="password"
            {...register("newPassword", {
              required: "This field is required",
            })}
            className="rounded-md px-4 h-8 shadow border border-gray-200 outline-blue-400"
          />
        </div>
        <button className="bg-blue-500 shadow w-full h-8.75 rounded text-white font-medium">
          Change
        </button>
      </form>
    </section>
  );
}

export default ChangePassword;
