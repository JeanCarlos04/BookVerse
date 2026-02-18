import { FaRegTrashCan } from "react-icons/fa6";
import useContextHook from "../hooks/useContextHook";

type DeleteBookPanelProps = {
  setSearchInputBook: React.Dispatch<React.SetStateAction<string>>;
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteBookPanel({
  setSearchInputBook,
  setShowConfirmModal,
}: DeleteBookPanelProps) {
  const { showModals, setShowModals } = useContextHook();

  return (
    <section className="p-4">
      <header className="text-lg font-medium">
        <h1 className="flex gap-2 items-center">
          Delete books <FaRegTrashCan />
        </h1>
      </header>
      <div className="flex flex-col gap-4 w-58 py-4">
        <input
          onChange={(e) => setSearchInputBook(e.target.value)}
          placeholder="Book title"
          className="border border-gray-200 shadow h-7.5 rounded-md pl-3 text-sm outline-red-400"
        />
        <button
          onClick={() => {
            setShowConfirmModal(true);
            setShowModals({
              ...showModals,
              confirmDeleteNotification: "showModal",
            });
          }}
          className="text-white bg-red-500 shadow font-medium rounded px-4 h-7.5"
        >
          Delete book
        </button>
      </div>
    </section>
  );
}

export default DeleteBookPanel;
