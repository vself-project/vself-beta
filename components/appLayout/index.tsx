/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useAppSelector } from '../../hooks';

import Loader from '../loader';
import LoginForm from './loginForm';
import { getAccountAndContract } from '../../utils/contract';
import { mainContractMethods, mainContractName } from '../../utils/contract-methods';

interface AppLayoutProps {
  children: React.ReactElement;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { is_authed } = useAppSelector((state) => state.appStateReducer);

  const signInToNear = async () => {
    const { signIn } = await getAccountAndContract(mainContractName, mainContractMethods);
    signIn();
  };

  return <Loader>{is_authed ? children : <LoginForm loginCallback={signInToNear} />}</Loader>;
};

export default AppLayout;
