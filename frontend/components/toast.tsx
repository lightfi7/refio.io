"use client";

import { useEffect, useState } from "react";

const Toast = ({
  message,
  type,
  onDismiss,
}: {
  message: string;
  type: "error" | "info" | "success" | "warning";
  onDismiss: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  const toastClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  return (
    <div
      className={`fixed bottom-5 left-5 p-4 rounded-lg shadow-lg text-white ${toastClasses[type]} bg-opacity-75 backdrop-blur-md transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button
          className="ml-4"
          onClick={() => {
            setIsVisible(false);
            onDismiss();
          }}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
