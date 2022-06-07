/* eslint-disable @next/next/no-img-element */
import React from 'react';
// import Router from 'next/router';

import { useRouter } from 'next/router';
// import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  setAppLoadingState,
  // setAppStateDevMode,
  signOutApp,
} from '../../store/reducers/appStateReducer/actions';
import { getPOWAccountAndContract } from '../../utils';
// import ThemeChanger from '../themeChanger';
import HashDoxLogo from '../icons/HashDoxLogo';

const Header: React.FC = () => {
  const { account_id } = useAppSelector((state) => state.userAccountReducer);
  // const { is_dev } = useAppSelector((state) => state.appStateReducer);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // const setDevMode = () => {
  //   dispatch(setAppStateDevMode(!is_dev));
  // };

  const signOut = async () => {
    const { signOut } = await getPOWAccountAndContract();
    signOut();
    dispatch(setAppLoadingState(true));
    dispatch(signOutApp());
    router.replace('/');
  };

  return (
    <nav
      className="
          hidden
          w-full
          flex flex-wrap
          items-center
          justify-between
          top-0 z-50
          py-4
          bg-gray-100
          text-gray-500
          hover:text-gray-700
          focus:text-gray-700
          dark:bg-black
          dark:text-white
          shadow-lg
          navbar navbar-expand-lg navbar-light
          "
    >
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <HashDoxLogo />
        {/* <img src="/robot.jpg" width={50} height={50} className="rounded-md float-left" alt="logo" /> */}
        {/* <button type="button" onClick={setDevMode}>
          Dev
        </button> */}
        {/* <ThemeChanger /> */}
        <div className="flex items-center relative font-rational">
          <a
            className="flex-col flex items-center hidden-arrow"
            href="#"
            id="dropdownMenuButton2"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={signOut}
          >
            <b>Signed as:</b>
            <span className="mr-2">{account_id}</span>
            {/* <img
              src="https://mdbootstrap.com/img/new/avatars/2.jpg"
              className="rounded-full"
              style={{ height: 25, width: 25 }}
              alt=""
              loading="lazy"
            /> */}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
