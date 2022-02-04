/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/router';
// import Link from 'next/link';
import UserAccountIcon from '../icons/UserAccountIcon';
import { useAppSelector } from '../../hooks';
import { connectingToNear } from '../../utils';

const Header: React.FC = () => {
  const { balance, account_id } = useAppSelector((state) => state.userAccountReducer);
  const router = useRouter();

  const getAccountBalance = async () => {
    const { account } = await connectingToNear();
    console.log(await account.getAccountBalance());
    console.log(await account.getAccountDetails());
    // await contract.start();
  };

  const navigateToProfile = () => router.push(`/profile/${account_id}`);

  return (
    <div className="container text-center fixed top-0 w-full border-b-2 flex items-center justify-between self-center mx-auto left-0 right-0">
      <img src="/robot.jpg" width={50} height={50} className="rounded-md float-left" alt="logo" />
      <span>{balance}</span>
      <span>{account_id}</span>
      <button onClick={getAccountBalance}>Get Account Balance</button>
      <button type="button" onClick={navigateToProfile}>
        <UserAccountIcon />
      </button>
    </div>
  );
};

export default Header;
