import { useState } from "react";
function useToast() {
  const [toasts, setToasts] = useState([]);
  const toast = ({ title, description, variant = "default" }) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, title, description, variant };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5e3);
    return id;
  };
  const dismiss = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };
  return {
    toasts,
    toast,
    dismiss
  };
}
export {
  useToast as u
};
