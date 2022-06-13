/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

interface StorePresenceProps {
  backBtnCallback: () => void;
  nextBtnCallback: () => void;
}

const StorePresence: React.FC<StorePresenceProps> = ({ backBtnCallback, nextBtnCallback }) => {
  return (
    <>
      <h2 className="my-5">Step 1: Download and try Hashd0x application.</h2>

      <h2 className="my-5">Step 2: Use it to take a photo of anything you have witnessed. </h2>

      <h2 className="my-5">Step 3: Choose your reward &amp; join the community.</h2>

      <div className="flex justify-between mb-5 flex-col md:flex-row">
        <Link href="https://apps.apple.com/ru/app/hashd0x/id1619383186" passHref>
          <a target="_blank" rel="noopener noreferrer">
            <h3>Apple</h3>
            <img src="/applenew.png" alt="AppStore" style={{ borderRadius: 6, maxWidth: 250, width: '100%' }} />
          </a>
        </Link>
        <Link href="https://play.google.com/store/apps/details?id=com.vSelf.PoW&amp;hl=ru&amp;gl=US" passHref>
          <a target="_blank" rel="noopener noreferrer">
            <h3>Google</h3>
            <img src="/google.png" alt="Google Play" style={{ borderRadius: 6, maxWidth: 250, width: '100%' }} />
          </a>
        </Link>
      </div>
      <div className="justify-between w-full flex-row flex">
        <button type="button" className="text-black bg-white uppercase px-5" onClick={backBtnCallback}>
          Back
        </button>
        <button onClick={nextBtnCallback} type="button" className="text-black bg-white uppercase px-5">
          Next
        </button>
      </div>
    </>
  );
};

export default StorePresence;
