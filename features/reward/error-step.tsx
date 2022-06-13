import React from 'react';
import { useRouter } from 'next/router';

const ErrorStep: React.FC = () => {
  const router = useRouter();
  const reloadPage = () => {
    router.replace('/reward');
  };
  return (
    <>
      <h2 className="my-5">Something went wrong. Please, contact us at info@vself.app or </h2>
      <div className="justify-between w-full flex-row flex">
        <button type="button" className="text-black bg-white uppercase px-5" onClick={reloadPage}>
          RETURN TO THE MAIN SCREEN
        </button>
      </div>
    </>
  );
};

export default ErrorStep;
