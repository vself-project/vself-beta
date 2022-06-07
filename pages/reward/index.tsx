/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Link from 'next/link';
// import { useTranslation } from 'next-i18next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import HashDoxLogo from '../../components/icons/HashDoxLogo';
import Loader from '../../components/loader';
import { useAppDispatch } from '../../hooks';
import { setAppLoadingState } from '../../store/reducers/appStateReducer/actions';
import { getConnectedContract } from '../../utils/contract';
import { addDocToFirestore } from '../../utils/firebase';

const PrizePage: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // Form State
  const [formStep, setFormStep] = useState<number>(0);
  const [formState, setFormState] = useState<number>(2);
  const [username, setUsername] = useState<string>('');
  const [wallet, setWallet] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    dispatch(setAppLoadingState(false));
  }, [dispatch]);

  const setRadioButton = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    const { value } = event.target;
    setFormState(Number(value));
  };

  const setNearWallet = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setWallet(value);
  };

  const setUserEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setEmail(value);
  };

  const setUserName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setUsername(value);
  };

  const collectEmail = async (): Promise<void> => {
    dispatch(setAppLoadingState(true));
    if (
      String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setFormStep(6);
      await addDocToFirestore('donate_emails', { email, username });
    } else {
      setFormStep(7);
    }
    dispatch(setAppLoadingState(false));
  };

  const sendReward = async () => {
    try {
      dispatch(setAppLoadingState(true));

      const response = await fetch('api/check-account?nearid=' + wallet);
      const result = await response.json();

      if (!result) {
        throw 'not exist';
      }

      const connection: any = await getConnectedContract();
      const { contract } = connection;
      const tokenId = await contract.send_reward({
        args: { username: wallet },
        gas: '300000000000000',
        amount: '10000000000000000000000',
      });
      await addDocToFirestore('participants', { wallet, username, tokenId });

      setFormStep(6);
    } catch (err) {
      setFormStep(7);
    } finally {
      dispatch(setAppLoadingState(false));
    }
  };

  const startStep = () => {
    setFormStep(1);
  };

  const setRewardType = () => {
    setFormStep(formState);
  };

  const goBack = () => {
    setFormStep(3);
  };

  const goToMain = () => {
    router.replace('/');
  };

  const goToDashboard = () => {
    router.replace('/dashboard');
  };

  const stepBack = () => {
    setFormStep(2);
  };

  const goToBeginig = () => {
    setFormStep(0);
  };

  const goToReward = () => {
    setFormStep(3);
  };

  const goToName = () => {
    setFormStep(2);
  };

  const goToStart = () => {
    setFormStep(0);
  };

  const renderSteps = () => {
    switch (formStep) {
      case 7:
        return (
          <>
            <h2 className="my-5">Something went wrong</h2>
            <div className="justify-between w-full flex-row flex">
              <button type="button" className="text-black bg-white uppercase px-5" onClick={goToMain}>
                Return to Main Page
              </button>
              <button type="button" className="text-black bg-white uppercase px-5" onClick={goToStart}>
                Try again
              </button>
            </div>
          </>
        );
      case 6:
        return (
          <>
            <h2 className="my-5 w-[600px]">Thank you for your help</h2>
            <div className="justify-between w-full flex-row flex">
              <button type="button" className="text-black bg-white uppercase px-5" onClick={goToMain}>
                Return to Main Page
              </button>
              <button type="button" className="text-black bg-white uppercase px-5" onClick={goToDashboard}>
                View on the Dashboard
              </button>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h2 className="my-5">Give us your NEAR account to receive a complimentary NFT.</h2>

            <h2 className="my-5">
              If you want to create one, follow the link.{' '}
              <Link href="https://wallet.near.org" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <span className="hover:text-gray-600 underline underline-offset-2 cursor-pointer">
                    https://wallet.near.org/
                  </span>
                </a>
              </Link>
            </h2>
            <input
              type="text"
              className="
            form-control
            block
            w-full
            px-3
            py-1
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            mb-5
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              onChange={setNearWallet}
              id="near"
              name="near"
              placeholder="Enter your NEAR wallet"
              value={wallet}
            />
            <div className="justify-between w-full flex-row flex">
              <button type="button" className="text-black bg-white uppercase px-5" onClick={goBack}>
                Back
              </button>
              <button type="button" className="text-black bg-white uppercase px-5" onClick={sendReward}>
                Next
              </button>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="my-5">
              For each onboarding user, we donate $0.5 NEAR to the Unchained{' '}
              <Link href="https://unchain.fund/" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <span className="hover:text-gray-600 underline underline-offset-2 cursor-pointer">
                    https://unchain.fund/
                  </span>
                </a>
              </Link>{' '}
              fund.{' '}
            </h2>

            <h2 className="my-5">
              If you want to receive confirmation and follow the campaign progress, live us your email:
            </h2>
            <input
              onChange={setUserEmail}
              type="text"
              className="
            form-control
            block
            w-full
            px-3
            py-1
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            mb-5
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
            <div className="justify-between w-full flex-row flex">
              <button type="button" className="text-black bg-white uppercase px-5" onClick={goBack}>
                Back
              </button>
              <button onClick={collectEmail} type="button" className="text-black bg-white uppercase px-5">
                Next
              </button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="my-5">Choose your reward:</h2>
            <div className="flex mb-5">
              <div>
                <div className="form-check  my-5">
                  <input
                    onChange={setRadioButton}
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
                    onChange={setRadioButton}
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
                    onChange={setRadioButton}
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
              <button type="button" className="text-black bg-white uppercase px-5" onClick={stepBack}>
                Back
              </button>
              <button onClick={setRewardType} type="button" className="text-black bg-white uppercase px-5">
                Next
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="my-5">
              One last thing: give us the account name that you used in the app and we set up a reward for you.{' '}
            </h2>
            <input
              onChange={setUserName}
              type="text"
              className="
            form-control
            block
            w-full
            px-3
            py-1
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            mb-5
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="appname"
              name="appname"
              placeholder="Enter your name"
              value={username}
            />
            <div className="justify-between w-full flex-row flex">
              <button type="button" className="text-black bg-white uppercase px-5" onClick={goToBeginig}>
                Back
              </button>
              <button
                disabled={username.length === 0}
                onClick={goToReward}
                type="button"
                className="text-black bg-white uppercase px-5"
              >
                Next
              </button>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h2 className="my-5">Step 1: Download and try Hashd0x application.</h2>

            <h2 className="my-5">Step 2: Use it to make a photo of anything you have witnessed. </h2>

            <h2 className="my-5">Step 3: Choose your reward & join the community.</h2>

            <div className="flex justify-between mb-5 flex-col md:flex-row">
              <img src="/applenew.png" alt="AppStore" style={{ borderRadius: 6, maxWidth: 250, width: '100%' }} />
              <img src="/google.png" alt="Google Play" style={{ borderRadius: 6, maxWidth: 250, width: '100%' }} />
            </div>
            <div className="justify-end w-full flex">
              <button onClick={goToName} type="button" className="text-black bg-white uppercase px-5">
                Next
              </button>
            </div>
          </>
        );
      default:
        return (
          <>
            <h2 className="my-5">Join Hashd0X and support Ukraine</h2>

            <p>
              HashdOx is a platform for instant and fraud-proof registration of images and their metadata on the NEAR
              blockchain. The app is addressing the problem of fake news and the falsification of facts about war
              consequences across Ukraine. It started as a collaboration of the vSelf team and Egor Kraft&apos;s art
              project Proof-of-War.
            </p>

            <p className="my-5">
              Now, we invite **you** to join our project and help us create a secure environment to share evidence of
              what you are witnessing. We will ask you to download and try our application. To celebrate your
              contribution, choose one of two options: we send you an NFT-gift or we donate $0.5 NEAR to the Unchained{' '}
              <Link href="https://unchain.fund/" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <span className="hover:text-gray-600 underline underline-offset-2 cursor-pointer">
                    https://unchain.fund/
                  </span>
                </a>
              </Link>{' '}
              fund.
            </p>
            <button type="button" className="text-black bg-white uppercase px-5" onClick={startStep}>
              Start
            </button>
          </>
        );
    }
  };
  return (
    <Loader>
      <div className="flex content-center flex-wrap h-screen font-rational justify-center text-white">
        <div
          style={{
            justifyContent: 'center',
            maxWidth: 600,
            margin: '0 auto',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: 10,
          }}
        >
          <div className="justify-between w-full flex-row flex">
            <HashDoxLogo />
          </div>
          {renderSteps()}
        </div>
      </div>
    </Loader>
  );
};

// export async function getStaticProps({ locale }: any) {
//   return {
//     props: {
//       ...(await serverSideTranslations('en', ['common', 'hashdox'])),
//     },
//   };
// }

export default PrizePage;
