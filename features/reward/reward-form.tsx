import React, { useState } from 'react';

interface RewardFormProps {
  nextBtnCallback: (reward: number) => void;
  backBtnCallback: () => void;
}

const RewardForm: React.FC<RewardFormProps> = ({ nextBtnCallback, backBtnCallback }) => {
  const [reward, setReward] = useState<number | null>(null);

  const setRewardType = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    const { value } = event.target;
    setReward(Number(value));
  };

  const goToReward = () => {
    reward && nextBtnCallback(reward);
  };

  return (
    <>
      <h2 className="my-5">Choose your reward:</h2>
      <div className="flex mb-5">
        <div>
          <div className="form-check  my-5">
            <input
              onChange={setRewardType}
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="reward"
              id="donate"
              value={4}
            />
            <label className="form-check-label inline-block" htmlFor="flexRadioDefault1">
              We donate to Ukraine
            </label>
          </div>
          <div className="form-check  my-5">
            <input
              onChange={setRewardType}
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="reward"
              id="nft"
              value={5}
            />
            <label className="form-check-label inline-block" htmlFor="flexRadioDefault2">
              Get NFT
            </label>
          </div>
          <div className="form-check my-5">
            <input
              onChange={setRewardType}
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="reward"
              id="nothing"
              value={6}
            />
            <label className="form-check-label inline-block" htmlFor="flexRadioDefault2">
              Nothing, glad to help!
            </label>
          </div>
        </div>
      </div>

      <div className="justify-between w-full flex-row flex">
        <button type="button" className="text-black bg-white uppercase px-5" onClick={backBtnCallback}>
          Back
        </button>
        <button disabled={!reward} onClick={goToReward} type="button" className="text-black bg-white uppercase px-5">
          Next
        </button>
      </div>
    </>
  );
};

export default RewardForm;
