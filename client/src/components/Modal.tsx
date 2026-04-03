import React, { type ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const modalRoot = document.getElementById("modal-root") as HTMLElement;

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const el = document.createElement("div");

  useEffect(() => {
    if (!isOpen) return;

    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, [isOpen, el]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    el,
  );
};
