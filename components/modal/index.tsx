import React from 'react';

interface ModalProps {
  title?: string;
  closeCallback?: () => void;
  isOpened?: boolean;
  isError?: boolean;
  wFull?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, wFull, closeCallback, isOpened, isError }) => {
  return (
    <div
      className="modal place-items-center fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto bg-background-dark hidden animate-fadein"
      style={isOpened ? { display: 'grid', opacity: 1 } : {}}
      tabIndex={-1}
      role="dialog"
      aria-modal={true}
    >
      <div
        className={`relative w-auto rounded-lg p-5 ${wFull ? 'container' : 'modal-dialog'}`}
        style={{
          backgroundColor: !isError ? '#95e474' : '#FFBABA',
          zIndex: 10,
        }}
      >
        <button
          type="button"
          className="absolute btn-close w-4 h-4 opacity-50 hover:opacity-75  hover:no-underline right-1 top-1 cursor-pointer "
          data-bs-dismiss="modal"
          style={{ zIndex: 11 }}
          aria-label="Close"
          onClick={closeCallback}
        ></button>
        {isOpened && children}
      </div>
    </div>
  );
};
export default Modal;
