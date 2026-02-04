import { useEffect } from "react";
import { FaRegEye, FaTrashCan, FaRegBellSlash } from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";
import ConfirmDelete from "./UX/ConfirmDelete";

function Notifications() {
  const { setShowModals, showModals, notifications, setNotifications } =
    useContextHook();

  const getNotifications = async () => {
    const res = await fetch("http://localhost:3000/notifications/get", {
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      setNotifications(data);
    }
  };

  const deleteAllNotifications = async () => {
    const res = await fetch("http://localhost:3000/notifications/delete/all", {
      credentials: "include",
      method: "DELETE",
    });

    if (res.ok) {
      setNotifications(() => []);
    }

    await res.json();
  };

  useEffect(() => {
    const init = async () => {
      getNotifications();
    };

    init();
  }, []);

  return (
    <>
      {notifications.length > 0 &&
      showModals.notificationModal !== "disappearModal" ? (
        <section
          onAnimationEnd={() => {
            if (showModals.notificationModal === "hideModal") {
              setShowModals({
                ...showModals,
                notificationModal: "disappearModal",
              });
            }
          }}
          style={{ top: "var(--nav-height)" }}
          className={`${showModals.notificationModal} notificationModal p-3 px-4 flex flex-col gap-2 shadow border border-gray-100 bg-white rounded-md fixed right-0`}
        >
          <header className="flex items-center justify-between">
            <h2 className="font-medium text-gray-600">Notifications</h2>
            <div className="flex items-center gap-4">
              <button className="cursor-pointer flex gap-1 items-center text-sm border text-gray-600 shadow border-gray-100 p-1 rounded-xl px-2">
                {<FaRegEye className="text-base" />}View all
              </button>
              <button
                onClick={() => {
                  setShowModals({
                    ...showModals,
                    confirmDeleteNotification: "showModal",
                  });
                }}
                className="text-red-500 cursor-pointer"
              >
                {<FaTrashCan />}
              </button>
            </div>
          </header>
          {notifications.map((noti) => {
            return (
              <article
                key={noti.description}
                className="flex flex-col pt-2 gap-1 w-68.75 relative border-t-2 border-gray-200"
              >
                {/* <img className="size-[40px] rounded" src={`http://localhost:3000/uploads/${noti.avatar_url}`} /> */}
                <h2 className="font-medium text-sm">{noti.title}</h2>
                <div className="flex gap-2">
                  <p className=" text-gray-600 text-sm">{noti.description}</p>
                  <p className="text-xs flex absolute items-end font-medium top-2 right-2">
                    {new Date(noti.created_at).toLocaleDateString()}
                  </p>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <>
          {showModals.notificationModal !== "disappearModal" && (
            <section
              onAnimationEnd={() => {
                if (showModals.notificationModal === "hideModal") {
                  setShowModals({
                    ...showModals,
                    notificationModal: "disappearModal",
                  });
                }
              }}
              style={{ top: "var(--nav-height)" }}
              className={`${showModals.notificationModal} notificationModal p-3 px-4 flex flex-col gap-2 shadow border border-gray-100 bg-white rounded-md fixed right-0 items-center`}
            >
              <h1 className="text-gray-400">There is no notifications yet.</h1>{" "}
              <FaRegBellSlash className="text-2xl text-gray-400" />
            </section>
          )}
        </>
      )}
      {
        <ConfirmDelete
          title="all notifications"
          handleDeleteFn={deleteAllNotifications}
        />
      }
    </>
  );
}

export default Notifications;
