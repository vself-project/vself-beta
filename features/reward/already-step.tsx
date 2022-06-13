import Link from 'next/link';
import React from 'react';

const AlreadyIssuedStep: React.FC = () => {
  return (
    <>
      <h2 className="my-5">This Near Id Already Has NFT Reward</h2>
      <h3>
        Feel free to contact us at <b>info@vself.app</b> if you have any questions.
      </h3>
      <div className="justify-between w-full flex-row flex">
        <Link href="/reward" passHref>
          <button type="button" className="text-black bg-white uppercase px-5">
            Return to Main Page
          </button>
        </Link>

        <Link href="/reward" passHref>
          <button type="button" className="text-black bg-white uppercase px-5">
            Try Again
          </button>
        </Link>
      </div>
    </>
  );
};

export default AlreadyIssuedStep;
