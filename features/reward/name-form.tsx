import React from 'react';

interface NameFormProps {
  inputHandle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  backBtnCallback: () => void;
  nextBtnCallback: () => void;
}

const NameForm: React.FC<NameFormProps> = ({ inputHandle, inputValue, backBtnCallback, nextBtnCallback }) => {
  return (
    <>
      <h2 className="my-5">
        One last thing: give us the account name that you used in the app and we set up a reward for you.{' '}
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
        id="appname"
        name="appname"
        placeholder="Enter your name"
        value={inputValue}
      />
      <div className="justify-between w-full flex-row flex">
        <button type="button" className="text-black bg-white uppercase px-5" onClick={backBtnCallback}>
          Back
        </button>
        <button
          disabled={inputValue.length === 0}
          onClick={nextBtnCallback}
          type="button"
          className="text-black bg-white uppercase px-5"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default NameForm;
