import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function fastNotify(message, status) {
  toast.dark(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: status,
  });
}

export default fastNotify;
