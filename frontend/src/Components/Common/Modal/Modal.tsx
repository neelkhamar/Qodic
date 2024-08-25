// src/components/Modal.js
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, title, children }: any) => {
  useEffect(() => {
    // Focus on the first focusable element in the modal when it opens
    if (isOpen) {
      const firstFocusableElement: any =
        document.querySelector('[tabindex="0"]');
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }
  }, [isOpen]);

  // Handle Escape key to close modal
  const handleKeyDown = (event: any) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onKeyDown={handleKeyDown}
    >
      <div
        role="document"
        className="bg-white rounded-lg shadow-lg max-w-sm w-full p-4 dark:bg-gray-800 dark:text-gray-300"
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
