import React from 'react';
import { StylesCSS } from '../../constants/styles';

interface ModalProps {
  modalTitle?: string;
  closeCallBack?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, modalTitle, closeCallBack }) => {
  return (
    <div className={`${StylesCSS.MODAL_DIALOG}`} tabIndex={-1} role="dialog" aria-modal={true}>
      <div className={`${StylesCSS.MODAL_DIALOG_2}`}>
        <div className={`${StylesCSS.MODAL_CONTENT}`}>
          <div className={`${StylesCSS.MODAL_HEADER}`}>
            <h5 className="text-xl font-medium leading-normal text-gray-800">{modalTitle}</h5>
            <button
              type="button"
              className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeCallBack}
            ></button>
          </div>

          <div className="modal-body relative p-4">{children}</div>

          {/* <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
            >
              Save changes
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
