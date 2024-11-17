import React from "react";
import FocusLock from "react-focus-lock";
import "./Dialog.css";

const Dialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <FocusLock>
          <header className="dialog-header">
            <h2>{title}</h2>
            <button onClick={onClose} aria-label="Close">
              ×
            </button>
          </header>
          <div className="dialog-content">{children}</div>
        </FocusLock>
      </div>
    </div>
  );
};

export default Dialog;
