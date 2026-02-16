import useContextHook from "../../hooks/useContextHook";

type ConfirmDeleteProps = {
  title: string;
  handleDeleteFn: () => void;
  showConfirmDelete: boolean;
  setHideConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

function ConfirmDelete({
  title,
  handleDeleteFn,
  showConfirmDelete,
  setHideConfirmDelete,
}: ConfirmDeleteProps) {
  const { showModals, setShowModals } = useContextHook();

  return (
    <>
      {showConfirmDelete && (
        <div className="h-screen w-screen fixed translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] backdrop-blur-xs">
          <section
            onAnimationEnd={() => {
              if (showModals.confirmDeleteNotification === "hideModal") {
                setTimeout(() => {
                  setShowModals({
                    ...showModals,
                    confirmDeleteNotification: "disappearModal",
                  });
                }, 700);
              }
            }}
            className={`${showModals.confirmDeleteNotification} p-4 flex flex-col gap-8 rounded-md shadow z-100 border border-gray-300 bg-white absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]`}
          >
            <header className="font-medium">
              Are you sure to delete {title}?
            </header>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowModals({
                    ...showModals,
                    confirmDeleteNotification: "disappearModal",
                  });
                  handleDeleteFn();
                }}
                className="bg-red-500 border border-red-400 w-full cursor-pointer font-medium text-white rounded-md shadow px-4 h-7.5 text-sm"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setShowModals({
                    ...showModals,
                    confirmDeleteNotification: "hideModal",
                  });
                  setHideConfirmDelete(false);
                }}
                className="bg-blac bg-gray-800 w-full cursor-pointer font-medium text-white rounded-md shadow px-4 h-7.5"
              >
                Cancel
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default ConfirmDelete;
