import React from 'react';
import Link from 'next/link';

const FinalStep: React.FC = () => {
  return (
    <>
      <h2 className="my-5 w-[600px]">Thank you for your help</h2>
      <h3>
        Feel free to contact us at <b>info@vself.app</b> if you have any questions.
      </h3>
      <div className="justify-between w-full flex-row flex mt-5">
        <Link href="/" passHref>
          <button type="button" className="text-black bg-white uppercase px-5">
            Return to Main Page
          </button>
        </Link>
        <Link href="/crowd" passHref>
          <button type="button" className="text-black bg-white uppercase px-5">
            View on the Dashboard
          </button>
        </Link>
      </div>
    </>
  );
};

export default FinalStep;
