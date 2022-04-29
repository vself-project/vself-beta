/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import HashDoxIcon from '../icons/HashDoxIcon';

interface FileImageComponentProps {
  url: string;
  className?: string;
}

const checkIfImageExists = (url: string, callback: any) => {
  const img = new Image();
  img.src = url;
  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };

    img.onerror = () => {
      callback(false);
    };
  }
};

const URLImageComponent: React.FC<FileImageComponentProps> = ({ url, className }) => {
  const [imgExist, setImgExists] = useState(false);

  useEffect(() => {
    checkIfImageExists(url, setImgExists);
  }, [url]);

  if (imgExist) {
    return <img className={className} src={url} alt="The image isn't available." />;
  }
  return (
    <div className="grid place-items-center h-full">
      <div className="text-center">
        <div className="animate-spin-slow">
          <HashDoxIcon />
        </div>
      </div>
    </div>
  );
};

export default URLImageComponent;
