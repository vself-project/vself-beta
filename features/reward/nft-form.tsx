import React from 'react';
import Link from 'next/link';

interface NFTFormProps {
  inputHandle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  backBtnCallback: () => void;
  nextBtnCallback: () => void;
}

const NFTForm: React.FC<NFTFormProps> = ({ inputHandle, backBtnCallback, nextBtnCallback, inputValue }) => {
  return (
    <>
      <h2 className="my-5">Give us your NEAR account to receive a complimentary NFT.</h2>

      <h2 className="my-5">
        If you want to create one, follow the link{' '}
        <Link href="https://wallet.near.org" passHref>
          <a target="_blank" rel="noopener noreferrer">
            <span className="hover:text-gray-600 underline underline-offset-2 cursor-pointer">
              https://wallet.near.org/
            </span>
          </a>
        </Link>
      </h2>
      <input
        type="text"
        className="
            form-control
            block
            w-full
            px-3
            py-1
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            mb-5
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        onChange={inputHandle}
        id="near"
        name="near"
        placeholder="Enter your NEAR wallet"
        value={inputValue}
      />
      <div className="justify-between w-full flex-row flex">
        <button type="button" className="text-black bg-white uppercase px-5" onClick={backBtnCallback}>
          Back
        </button>
        <button type="button" className="text-black bg-white uppercase px-5" onClick={nextBtnCallback}>
          Next
        </button>
      </div>
    </>
  );
};

export default NFTForm;
