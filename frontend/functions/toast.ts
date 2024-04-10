import { toast, Slide } from "react-toastify";

export const success = (str: string, style?: string) =>
  toast.success(str, {
    position: "bottom-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Slide,
    className: style,
  });

export const error = (str: String, style?: string) =>
  toast.error(str, {
    position: "bottom-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Slide,
    className: style,
  });
