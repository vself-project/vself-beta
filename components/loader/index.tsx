/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
// import SimpleSpinner from '../icons/SimpleSpinner';

interface LoaderProps {
  children: React.ReactElement;
}

export const SpinnerLoader: React.FC = () => {
  return (
    <div className="grid place-items-center h-screen">
      <div
        className="text-center animate-spin bg-transparent"
        style={{
          height: '7rem',
          width: '7rem',
          backgroundImage: 'url(g6.png)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          borderRadius: '50%',
        }}
      ></div>
    </div>
  );
};

const Loader: React.FC<LoaderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { is_loading } = useAppSelector((state) => state.appStateReducer);

  useEffect(() => {
    setIsLoading(is_loading);
  }, [is_loading]);

  return isLoading ? <SpinnerLoader /> : children;
};

export default Loader;
