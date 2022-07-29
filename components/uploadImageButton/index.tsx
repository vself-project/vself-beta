/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect } from 'react';
import UploadIcon from '../icons/UploadIcon';

interface UploadImageButtonProps {
  onImageSet: (file: File) => void;
  file?: File;
}

const UploadImageButton: React.FC<UploadImageButtonProps> = ({ onImageSet, file }) => {
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

  useEffect(() => {
    if (file) {
      setImgSrc(URL.createObjectURL(file));
    } else {
      setImgSrc(null);
    }
  }, [file]);

  return (
    <button
      type="button"
      onClick={handleBtnClick}
      style={{ minHeight: 300 }}
      className={`${
        imgSrc ? 'bg-transparent' : 'bg-slate-100'
      } flex justify-center items-center rounded-lg w-full shadow-lg  max-w-sm mb-2 hover:bg-gray-200 text-gray-400 hover:text-white transition ease-in-out delay-150 border-0`}
    >
      <input
        type="file"
        ref={inputFileRef}
        className="hidden"
        accept="image/png, image/gif, image/jpeg"
        onChange={handleImageChange}
      />
      {imgSrc ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            maxHeight: 300,
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ) : (
        <UploadIcon />
      )}
    </button>
  );
};

export default UploadImageButton;
