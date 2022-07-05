/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface LoginFormProps {
  loginCallback: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ loginCallback }) => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center" style={{ maxWidth: 600 }}>
        <h2 className="text-white font-rational">Welcome to VSELF</h2>
        <button
          type="button"
          className="uppercase cursor-pointer hover:opacity-70 underline-offset-8 underline text-white font-druk"
          onClick={loginCallback}
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
