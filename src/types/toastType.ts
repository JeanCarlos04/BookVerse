export type ToastType = {
  type: "add" | "delete" | "edit";
  message: string;
  class?: "showToast" | "hideToast" | "disappearToast";
};
