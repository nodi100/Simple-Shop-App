import React from "react";
import Button from "../button/Button";
import { ModalProps } from "./types";

const Modal = ({
  isOpen,
  onClose,
  title,
  closeBtnText,
  children,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white p-6 rounded-lg w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
        <div className="mt-4 flex justify-end">
          <Button
            onClick={onClose}
            variant={closeBtnText ? "primary" : "danger"}
          >
            {closeBtnText || "Close"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
