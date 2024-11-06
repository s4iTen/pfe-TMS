import React from "react";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const CustomToast = ({ message, icon, type = "default" }) => {
  const darkMode = useSelector((state) => state.global.mode);

  const iconStyles = {
    success: "text-green-600",
    error: "text-red-600",
    default: "text-blue-600",
  };

  return (
    <div
      className={`flex items-center space-x-3 p-4 shadow-lg rounded-md ${
        darkMode === "dark" ? "bg-[#555]" : "bg-[#Fff]"
      }`}
    >
      {icon && <span className={`${iconStyles[type]}`}>{icon}</span>}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};
export const showToast = (message, icon, type = "default", duration = 4000) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } transition-all duration-300 ease-out `}
      >
        <CustomToast
          message={message}
          icon={icon}
          duration={duration}
          type={type}
        />
      </div>
    ),
    { duration }
  );
};

const ToastProvider = () => {
  return <Toaster position="bottom-right" />;
};

export default ToastProvider;
