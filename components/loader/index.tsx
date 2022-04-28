import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import HashDoxIcon from '../icons/HashDoxIcon';

interface LoaderProps {
  children: React.ReactElement;
}

const Loader: React.FC<LoaderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { is_loading } = useAppSelector((state) => state.appStateReducer);

  useEffect(() => {
    setIsLoading(is_loading);
  }, [is_loading]);

  const renderLoader = () => {
    return (
      <div className="grid place-items-center h-screen">
        <div className="text-center">
          <div className="animate-spin-slow">
            <HashDoxIcon />
          </div>
        </div>
      </div>
    );
  };

  return isLoading ? renderLoader() : children;
};

export default Loader;
