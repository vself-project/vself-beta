/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPOWAccountAndContract } from '../../utils';
import { getUserAccountData } from '../../store/reducers/userAccountReducer/actions';
import { setAppLoadingState, signInApp } from '../../store/reducers/appStateReducer/actions';

import Loader from '../loader';
import LoginForm from './loginForm';

interface AppLayoutProps {
  children: React.ReactElement;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { is_authed } = useAppSelector((state) => state.appStateReducer);
  const { account_id } = useAppSelector((state) => state.userAccountReducer);
  const dispatch = useAppDispatch();

  const signInToNear = async () => {
    const { signIn } = await getPOWAccountAndContract();
    signIn();
  };

  useEffect(() => {
    const initVselfWebApp = async () => {
      try {
        await getPOWAccountAndContract();
        dispatch(signInApp());
        dispatch(getUserAccountData({ account_id }));
      } catch (err) {
        console.log('Cannot connect to contract: ', err);
      } finally {
        setTimeout(() => {
          dispatch(setAppLoadingState(false));
        }, 1000);
      }
    };
    initVselfWebApp();
  }, [dispatch, account_id]);

  return <Loader>{is_authed ? children : <LoginForm loginCallback={signInToNear} />}</Loader>;
};

export default AppLayout;
