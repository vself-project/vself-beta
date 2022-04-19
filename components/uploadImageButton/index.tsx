/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from 'react';
import { StylesCSS } from '../../constants/styles';
import UploadIcon from '../icons/UploadIcon';

interface UploadImageButtonProps {
  onImageSet: (file: File) => void;
}

const UploadImageButton: React.FC<UploadImageButtonProps> = ({ onImageSet }) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleBtnClick = (): void => {
    if (inputFileRef && inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length) {
      setImgSrc(URL.createObjectURL(event.target.files[0]));
      onImageSet(event.target.files[0]);
    }
  };

  return (
    <button type="button" onClick={handleBtnClick} style={{ minWidth: 400 }} className={StylesCSS.UPLOAD_IMAGE_BUTTON}>
      <input
        type="file"
        ref={inputFileRef}
        className="hidden"
        accept="image/png, image/gif, image/jpeg"
        onChange={handleImageChange}
      />
      {imgSrc ? (
        <img src={imgSrc} alt="Uploading Image" className="object-cover h-96 w-96 rounded-lg" />
      ) : (
        <div className="p-20">
          <UploadIcon />
        </div>
      )}
    </button>
  );
};

export default UploadImageButton;
