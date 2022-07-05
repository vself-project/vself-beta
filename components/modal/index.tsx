import React, { useState } from 'react';
import { StylesCSS } from '../../constants/styles';

interface ModalProps {
  title?: string;
  closeCallback?: () => void;
  isOpened?: boolean;
  isError?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, title, closeCallback, isOpened, isError }) => {
  // const [isShowed, setIsShowed] = useState<boolean>(isOpened || false);

  return (
    <div
      className="modal place-items-center fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto bg-background-dark hidden animate-fadein"
      style={isOpened ? { display: 'grid', opacity: 1 } : {}}
      tabIndex={-1}
      role="dialog"
      aria-modal={true}
    >
      <div
        className="modal-dialog relative w-auto rounded-lg"
        style={{ backgroundColor: !isError ? '#95e474' : '#FFBABA', zIndex: 10 }}
      >
        {/* <div className={`${StylesCSS.MODAL_HEADER}`}>
            <h5 className="text-xl font-medium leading-normal text-gray-800">{title}</h5>
          </div> */}
        <button
          type="button"
          className="absolute btn-close w-4 h-4 opacity-50 hover:opacity-75  hover:no-underline right-2 top-2 cursor-pointer "
          data-bs-dismiss="modal"
          style={{ zIndex: 11 }}
          aria-label="Close"
          onClick={closeCallback}
        ></button>
        <div className="modal-body relative p-4">{isOpened && children}</div>
      </div>
    </div>
  );
};
export default Modal;
