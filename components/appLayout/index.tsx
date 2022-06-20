/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getNearAccountAndContract, getPOWAccountAndContract } from '../../utils';
import { getUserAccountData } from '../../store/reducers/userAccountReducer/actions';
import { setAppLoadingState, signInApp } from '../../store/reducers/appStateReducer/actions';

import Loader from '../loader';
import LoginForm from './loginForm';
import { setEventStatus } from '../../store/reducers/eventReducer/actions';

interface AppLayoutProps {
  children: React.ReactElement;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { is_authed } = useAppSelector((state) => state.appStateReducer);
  const dispatch = useAppDispatch();

  const signInToNear = async () => {
    const { signIn } = await getNearAccountAndContract();
    signIn();
  };

  useEffect(() => {
    const initVselfWebApp = async () => {
      try {
        const { isSignedIn, walletAccountId, contract } = await getNearAccountAndContract();
        if (isSignedIn) {
          dispatch(signInApp());
          dispatch(getUserAccountData({ account_id: walletAccountId }));
          const is_active = await contract.is_active();
          dispatch(setEventStatus(is_active));
        }
      } catch (err) {
        console.log('Cannot connect to contract: ', err);
      } finally {
        setTimeout(() => {
          dispatch(setAppLoadingState(false));
        }, 1000);
      }
    };
    initVselfWebApp();
  }, [dispatch]);

  return <Loader>{is_authed ? children : <LoginForm loginCallback={signInToNear} />}</Loader>;
};

export default AppLayout;
