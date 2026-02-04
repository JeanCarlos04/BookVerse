import { FaBookBookmark } from "react-icons/fa6";
import useContextHook from "../../hooks/useContextHook";
import { useEffect, useRef, useState } from "react";

type toastClass = "showToast" | "hideToast" | "disappearToast";

function ToastModal() {
  const { toastType } = useContextHook();
  const inputRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [toastClass, setToastClass] = useState<toastClass>("disappearToast");

  function handleToastModal() {
    return (
      <div
        onAnimationEnd={() => {
          if (toastClass === "hideToast") {
            setToastClass("disappearToast");
          }
        }}
        className={`${toastClass} ${toastType?.type === "add" ? "bg-green-400 border-green-300" : "bg-red-500 border-red-400"} border border-green-300 rounded-md px-4 py-1 fixed right-[50%] bottom-6 translate-x-[-50%] `}
      >
        <p className={`text-white font-medium flex items-center gap-2`}>
          {toastType?.message}
          <FaBookBookmark />
        </p>
      </div>
    );
  }

  useEffect(() => {
    if (inputRef.current) clearTimeout(inputRef.current);

    if (toastType !== undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToastClass("showToast");
      inputRef.current = setTimeout(() => {
        setToastClass("hideToast");
      }, 2000);
    }
  }, [toastType]);

  return <>{toastClass !== "disappearToast" && handleToastModal()} </>;
}

export default ToastModal;
