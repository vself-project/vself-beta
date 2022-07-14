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
import { getAccountAndContract } from '../../utils/contract';
import { mainContractMethods, mainContractName } from '../../utils/contract-methods';
import ActiveLink from '../active-link';
// import ThemeChanger from '../themeChanger';
// import HashDoxLogo from '../icons/HashDoxLogo';

const Header: React.FC = () => {
  // const { account_id } = useAppSelector((state) => state.userAccountReducer);
  const { is_authed } = useAppSelector((state) => state.appStateReducer);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // const setDevMode = () => {
  //   dispatch(setAppStateDevMode(!is_dev));
  // };

  const signOut = async () => {
    const { signOut, signIn } = await getAccountAndContract(mainContractName, mainContractMethods);
    dispatch(setAppLoadingState(true));
    if (is_authed) {
      signOut();
      dispatch(signOutApp());
    } else {
      signIn();
    }
    router.replace('/');
    dispatch(setAppLoadingState(false));
  };

  return (
    <nav
      className="flex xl:fixed w-full justify-center top-0 z-50 py-4 text-gray-500"
      style={{ backgroundColor: '#95e474' }}
    >
      <div className="container flex justify-between items-center">
        <img src="/dude4.png" width={50} height={50} className="rounded-md float-left" alt="logo" />
        <div className="flex flex-row">
          <ActiveLink href="/event">
            <span className="mx-1">New Event</span>
          </ActiveLink>

          <ActiveLink href="/linkdrop">
            <span className="mx-1">LinkDrop</span>
          </ActiveLink>

          <ActiveLink href="/">
            <span className="mx-1">Stats</span>
          </ActiveLink>

          <a
            className="flex-row flex hidden-arrow ml-1"
            href="#"
            id="dropdownMenuButton2"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={signOut}
          >
            <span className="mr-2 text-white">{is_authed ? 'Sign Out' : 'Sign In'}</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
