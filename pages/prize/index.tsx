/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import AppLayout from '../../components/appLayout';
import HashDoxLogo from '../../components/icons/HashDoxLogo';
import { useAppDispatch } from '../../hooks';
import { mockUserAccount } from '../../mockData/mockUserAccount';
import { setAppLoadingState } from '../../store/reducers/appStateReducer/actions';
import { getPOWAccountAndContract } from '../../utils';
import { addDocToFirestore } from '../../utils/firebase';

const PrizePage: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { signMeta } = router.query;
  console.log(signMeta);

  const { t } = useTranslation(['hashdox', 'common']);
  // Form State
  const [formStep, setFormStep] = useState<number>(0);
  const [formState, setFormState] = useState<number>(2);
  const [username, setUsername] = useState<string>('');
  const [wallet, setWallet] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (signMeta === 'done') {
      setFormStep(6);
    }
  }, [signMeta]);

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
    setFormStep(6);
    await addDocToFirestore('donate_emails', { email, username });
    dispatch(setAppLoadingState(false));
  };

  const sendReward = async () => {
    try {
      dispatch(setAppLoadingState(true));
      const { contract } = await getPOWAccountAndContract(mockUserAccount.account_id);
      await addDocToFirestore('participants', { wallet, username });
      await contract.send_reward({
        callbackUrl: 'https://vself-dev.web.app/prize', // callbackUrl after the transaction approved (optional)
        meta: 'done',
        args: { username: wallet },
        gas: '300000000000000',
        amount: '8690000000000000000000',
      });
    } catch (err) {
      console.log(err);
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
  const renderSteps = () => {
    switch (formStep) {
      case 6:
        return (
          <>
            <h2 className="my-5">Thank you for your help</h2>
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
            <h2 className="my-5">Donate</h2>
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
            <h2 className="my-5">Donate</h2>
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
            <h2 className="my-5">Choose your reward: {formState}</h2>
            <div className="flex mb-5">
              <div>
                <div className="form-check">
                  <input
                    onChange={setRadioButton}
                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="reward"
                    id="donate"
                    value={4}
                  />
                  <label className="form-check-label inline-block" htmlFor="flexRadioDefault1">
                    Donate UA
                  </label>
                </div>
                <div className="form-check">
                  <input
                    onChange={setRadioButton}
                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="reward"
                    id="nft"
                    value={5}
                  />
                  <label className="form-check-label inline-block" htmlFor="flexRadioDefault2">
                    Nft
                  </label>
                </div>
                <div className="form-check">
                  <input
                    onChange={setRadioButton}
                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="reward"
                    id="nothing"
                    value={6}
                  />
                  <label className="form-check-label inline-block" htmlFor="flexRadioDefault2">
                    Nothing
                  </label>
                </div>
              </div>
            </div>

            <div className="justify-between w-full flex-row flex">
              <button type="button" className="text-black bg-white uppercase px-5" onClick={() => setFormStep(2)}>
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
            <h2 className="my-5">Enter your name in Hashdox App</h2>
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
              <button type="button" className="text-black bg-white uppercase px-5" onClick={() => setFormStep(0)}>
                Back
              </button>
              <button
                disabled={username.length === 0}
                onClick={() => setFormStep(3)}
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
            <h2 className="my-5">Download Hashdox App</h2>
            <div className="flex justify-between mb-5 flex-col md:flex-row">
              <img src="/applenew.png" alt="AppStore" style={{ borderRadius: 6, maxWidth: 250, width: '100%' }} />
              <img src="/google.png" alt="Google Play" style={{ borderRadius: 6, maxWidth: 250, width: '100%' }} />
            </div>
            <div className="justify-end w-full flex">
              <button onClick={() => setFormStep(2)} type="button" className="text-black bg-white uppercase px-5">
                Next
              </button>
            </div>
          </>
        );
      default:
        return (
          <>
            <h2 className="my-5">Reward for testing MVP</h2>
            <img
              className="mb-5"
              alt="Hashdox"
              src="https://firebasestorage.googleapis.com/v0/b/hashdox.appspot.com/o/photo_2022-05-30%2023.56.27.jpeg?alt=media&token=c225e581-da3d-4697-84ce-62a09683e451"
            />
            <button type="button" className="text-black bg-white uppercase px-5" onClick={startStep}>
              Start
            </button>
          </>
        );
    }
  };
  return (
    <AppLayout>
      <div className="flex content-center flex-wrap h-screen font-rational justify-center">
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
          <HashDoxLogo />
          <p>{t('paragraph_0')}</p>
          {renderSteps()}
        </div>
      </div>
    </AppLayout>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'hashdox'])),
    },
  };
}

export default PrizePage;
