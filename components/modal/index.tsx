import React from 'react';
import { StylesCSS } from '../../constants/styles';

interface ModalProps {
  title?: string;
  closeCallback?: () => void;
  isOpened?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, title, closeCallback, isOpened }) => {
  return (
    <div
      className={`${StylesCSS.MODAL_BACKGROUND} bg-background-dark hidden ${
        isOpened && 'dropdown-menu show'
      } animate-fadein`}
      tabIndex={-1}
      role="dialog"
      aria-modal={true}
    >
      <div className={`${StylesCSS.MODAL_DIALOG} `}>
        <div className={`${StylesCSS.MODAL_CONTENT}`}>
          <div className={`${StylesCSS.MODAL_HEADER}`}>
            <h5 className="text-xl font-medium leading-normal text-gray-800">{title}</h5>
          </div>
          <button
            type="button"
            className={`${StylesCSS.MODAL_CLOSE_BUTTON} right-2 top-0 `}
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={closeCallback}
          >
            &times;
          </button>
          <div className="modal-body relative p-4">{isOpened && children}</div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
