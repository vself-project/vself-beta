import React from 'react';
import Link from 'next/link';

interface DonationProps {
  inputHandle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  backBtnCallback: () => void;
  nextBtnCallback: () => void;
}

const DonationForm: React.FC<DonationProps> = ({ inputHandle, backBtnCallback, nextBtnCallback, inputValue }) => {
  return (
    <>
      <h2 className="my-5">
        For each onboarding user, we donate $0.5 NEAR to the{' '}
        <Link href="https://unchain.fund/" passHref>
          <a target="_blank" rel="noopener noreferrer">
            <span className="hover:text-gray-600 underline underline-offset-2 cursor-pointer">Unchain</span>
          </a>
        </Link>{' '}
        fund.{' '}
      </h2>

      <h2 className="my-5">
        If you want to receive confirmation and follow the campaign progress, leave us your email:
      </h2>
      <input
        onChange={inputHandle}
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
        id="email"
        name="email"
        placeholder="Enter your email"
        value={inputValue}
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
      />
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

export default DonationForm;
