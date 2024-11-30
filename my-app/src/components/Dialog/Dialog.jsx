import React from "react";
import { Portal } from 'react-portal';
import FocusTrap from 'focus-trap-react';
import './Dialog.css';

const Dialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className="dialog-overlay" onClick={onClose}>
        <FocusTrap>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <header className="dialog-header">
              <h2>{title}</h2>
              <button onClick={onClose} aria-label="Close">
                ×
              </button>
            </header>
            <div className="dialog-content">{children}</div>
          </div>
        </FocusTrap>
      </div>
    </Portal>
  );
};

export default Dialog;
