/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { renderFirebaseImage } from '../../utils/firebase';

interface FirebaseImageProps {
  hash: string;
}

const FirebaseImage: React.FC<FirebaseImageProps> = ({ hash }) => {
  const [imgSrc, setImageSrc] = useState<string>();

  useEffect(() => {
    const getFirebaseImgSrc = async () => {
      const url = await renderFirebaseImage(hash);
      setImageSrc(url);
    };
    getFirebaseImgSrc();
  }, [hash]);

  return <img src={imgSrc ? imgSrc : '/0.png'} alt="" />;
};

export default FirebaseImage;
