/* eslint-disable @next/next/no-img-element */
import React from 'react';
import HashDoxLogo from '../icons/HashDoxLogo';

interface LoginFormProps {
  loginCallback: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ loginCallback }) => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="" style={{ maxWidth: 600 }}>
        <HashDoxLogo />
        <button type="button" className="uppercase px-5 bg-white text-black font-rational" onClick={loginCallback}>
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
