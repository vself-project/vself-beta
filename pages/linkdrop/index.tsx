/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import type { NextPage } from 'next';
import { checkNearAccount } from '../../utils';

import Loader from '../../components/loader';
import { useAppDispatch } from '../../hooks';
import { setAppLoadingState } from '../../store/reducers/appStateReducer/actions';
import Modal from '../../components/modal';
import { linkDropMethods, linkDropName } from '../../utils/contract-methods';
import { createNearAccount } from '../../utils/contract';

const MAIN_TEXT =
  'Hello dear traveler welcome to the page which will guide you through the onboarding process! ' +
  'Your Account ID will be used for all NEAR operations, including sending and receiving assets (e.g. NFTS).' +
  'Please enter an account ID you want to claim and use with your free NEAR account.';
const RULES = 'Your account ID can contain any of the following:';
const RULE1 = 'Lowercase characters (a-z)';
const RULE2 = 'Digits (0-9)';
const RULE3 = 'Characters (_-) can be used as separators';
const RULES2 = 'Your account ID CANNOT contain:';
const RULE4 = 'Characters "@" or "."';
const RULE5 = 'Fewer than 2 characters';
const RULE6 = 'More than 64 characters (including .near)';

const LinkDrop: NextPage = () => {
  const [nearid, setNearid] = React.useState('');
  const [message, setMessage] = React.useState<JSX.Element | null>(null);
  const [seed, setSeed] = React.useState(null);
  const [showSeed, setShowSeed] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  const dispatch = useAppDispatch();

  const FAILURE_MESSAGE = () => {
    return (
      <>
        <p>Sorry, it seems desired name has already been taken or we ran out of free accounts. </p>
        <p>
          Please contact us on social media or email{' '}
          <a className="underline" href="mailto:info@vself.app">
            info@vself.app
          </a>{' '}
          and we will guide you through onboarding.
        </p>
      </>
    );
  };
  '' + '';
  const SUCCESS_MESSAGE = () => {
    return (
      <p>
        Congrats! You have claimed your free NEAR account! Click here{' '}
        <a href="https://wallet.near.org/" className="hover:underline" target="_blank">
          `🖤`NEAR`🖤`
        </a>
        , if you want to login to your account now. Please don’t forget to write down your mnemonic phrase and use the
        official NEAR wallet in the future. That is where your reward will be stored.
      </p>
    );
  };

  const ACCOUNT_IS_BUSY = () => <p>This account is busy</p>;

  // Call contract method
  const callCreateAccount = async () => {
    try {
      dispatch(setAppLoadingState(true));

      // If account is busy show the message
      // Some problem with COARS
      const accountExists = await checkNearAccount(nearid, 'mainnet');
      if (accountExists) {
        setMessage(ACCOUNT_IS_BUSY);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        return;
      }
      const { result, seedPhrase } = await createNearAccount(nearid, linkDropName, linkDropMethods);
      if (result) {
        setMessage(SUCCESS_MESSAGE);
        setSeed(seedPhrase);
      } else {
        setIsError(true);
        setMessage(FAILURE_MESSAGE);
        setTimeout(() => {
          setMessage(null);
          setIsError(false);
        }, 10000);
      }
      return;
    } catch (err) {
      console.log(err);
      setIsError(true);
      setMessage(FAILURE_MESSAGE);
      setTimeout(() => {
        setMessage(null);
        setIsError(false);
      }, 10000);
    } finally {
      setTimeout(() => {
        dispatch(setAppLoadingState(false));
      }, 1000);
    }
  };

  // User ID input handler
  const onEventNearIDChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    setNearid(value.toLowerCase());
  };

  // TESTNET/MAINNET
  //const placeholder = 'new_account.testnet';
  const placeholder = 'new_account.near';

  const closeModal = () => {
    setMessage(null);
  };

  return (
    <Loader>
      <>
        <Modal isOpened={!!message} isError={isError} closeCallback={closeModal}>
          <p className="text-black" style={{ color: !isError ? '#000' : '#D8000C' }}>
            {message}
          </p>
        </Modal>
        <div className="grid place-items-center h-screen">
          <div className="text-black">
            <div className="w-96 mb-8">
              {!seed && (
                <p>
                  Welcome to the page which will guide you through the onboarding process. To receive your NFT rewards
                  in the vSelf app, you should first create a NEAR account. If you do not have one, we’ve got your back!
                  Just choose a nickname with the format “newaccount.near” and type in below.
                </p>
              )}
            </div>
            {seed && (
              <div className="w-96 mb-8">
                To operate your newly registered account use your mnemonic seed phrase to login to{' '}
                <a href="https://wallet.near.org/" target="_blank" className="underline">
                  official NEAR wallet
                </a>
              </div>
            )}

            {!seed && (
              <input
                autoComplete="off"
                type="text"
                name="nearid"
                onChange={onEventNearIDChange}
                value={nearid}
                className="mb-4 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder={placeholder}
              />
            )}
            {seed === null ? (
              <div>
                <div
                  style={{
                    width: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginBottom: 10,
                  }}
                >
                  <p>{RULES}</p>
                  <p style={{ fontSize: 14 }}>{' - ' + RULE1}</p>
                  <p style={{ fontSize: 14 }}>{' - ' + RULE2}</p>
                  <p style={{ fontSize: 14 }}>{' - ' + RULE3}</p>
                </div>
                <div
                  style={{
                    width: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginBottom: 14,
                  }}
                >
                  <p>{RULES2}</p>
                  <p style={{ fontSize: 14 }}>{' - ' + RULE4}</p>
                  <p style={{ fontSize: 14 }}>{' - ' + RULE5}</p>
                  <p style={{ fontSize: 14 }}>{' - ' + RULE6}</p>
                </div>
                <div className="text-center mt-8">
                  <button
                    style={{
                      fontSize: 20,
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: 6,
                      padding: '6px 14px 6px 14px',
                    }}
                    type="button"
                    className="hover:opacity-75"
                    onClick={callCreateAccount}
                  >
                    Claim Near Account
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {showSeed && (
                  <div className="w-96 mb-2">
                    <h3>Your Seed Phrase:</h3>
                    <div className="border-2 p-2 my-4 border-amber-300">
                      <p className="text-red-700">{seed}</p>
                    </div>
                  </div>
                )}
                {showSeed ? (
                  <button
                    style={{
                      margin: '0 10px 0 10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: 5,
                      padding: '5px 10px 5px 10px',
                    }}
                    type="button"
                    onClick={() => {
                      setShowSeed(false);
                    }}
                  >
                    Hide Seed Phrase
                  </button>
                ) : (
                  <button
                    style={{
                      margin: '0 10px 0 10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: 5,
                      padding: '5px 10px 5px 10px',
                    }}
                    type="button"
                    onClick={() => {
                      setShowSeed(true);
                    }}
                  >
                    Show Seed Phrase
                  </button>
                )}
                <button
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 5,
                    padding: '5px 10px 5px 10px',
                  }}
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(seed);
                  }}
                >
                  Copy Seed Phrase
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    </Loader>
  );
};

export default LinkDrop;
