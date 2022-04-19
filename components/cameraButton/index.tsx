/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { StylesCSS } from '../../constants/styles';
import CameraIcon from '../icons/CameraIcon';

interface UploadImageButtonProps {
  callback: () => void;
  imgSrc?: string;
}

const CameraButton: React.FC<UploadImageButtonProps> = ({ callback, imgSrc }) => {
  return (
    <button type="button" onClick={callback} style={{ minWidth: 400 }} className={StylesCSS.UPLOAD_IMAGE_BUTTON}>
      {imgSrc ? (
        <img src={imgSrc} alt="Uploading Image" className="object-cover h-96 w-96 rounded-lg" />
      ) : (
        <div className="p-20">
          <CameraIcon />
        </div>
      )}
    </button>
  );
};

export default CameraButton;
