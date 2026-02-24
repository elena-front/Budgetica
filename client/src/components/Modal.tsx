import React, { type ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

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
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose} style={{ marginTop: "1rem" }}>
          Close
        </button>
      </div>
    </div>,
    el,
  );
};

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle: React.CSSProperties = {
  background: "#fff",
  padding: "2rem",
  borderRadius: "8px",
  minWidth: "300px",
};
