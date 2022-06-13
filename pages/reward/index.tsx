/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import HashDoxLogo from '../../components/icons/HashDoxLogo';
import Loader from '../../components/loader';
import AlreadyIssuedStep from '../../features/reward/already-step';
import DonationForm from '../../features/reward/donation-form';
import ErrorStep from '../../features/reward/error-step';
import FinalStep from '../../features/reward/final-step';
import Introduction from '../../features/reward/introduction';
import NameForm from '../../features/reward/name-form';
import NFTForm from '../../features/reward/nft-form';
import RewardForm from '../../features/reward/reward-form';
import StorePresence from '../../features/reward/store-presence';
import { useAppDispatch } from '../../hooks';
import { setAppLoadingState } from '../../store/reducers/appStateReducer/actions';
import { addDocToFirestore, isRewardAddedToFirestore } from '../../utils/firebase';

const PrizePage: NextPage = () => {
  const dispatch = useAppDispatch();
  // Form State
  const [formStep, setFormStep] = useState<number>(0);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [wallet, setWallet] = useState<string>('');

  useEffect(() => {
    dispatch(setAppLoadingState(false));
  }, [dispatch]);

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
      // Verifying Near Id is Exists
      const checkResponse = await fetch('api/check-account?nearid=' + wallet);
      const result = await checkResponse.json();
      if (!result) {
        throw 'not exist';
      }
      // Check If Reward Already Issued
      const isRewardIssued = await isRewardAddedToFirestore(wallet);
      if (isRewardIssued) {
        throw 'already issued';
      }
      // Sending Reward
      const rewardResponse = await fetch('api/send-reward?nearid=' + wallet);
      const { tokenId } = await rewardResponse.json();
      // Adding Participant to Firestore
      await addDocToFirestore('participants', { wallet, username, tokenId });
      // Showing Success Message
      setFormStep(6);
    } catch (err) {
      switch (err) {
        case 'already issued':
          setFormStep(8);
          break;
        default:
          setFormStep(7);
          return;
      }
    } finally {
      dispatch(setAppLoadingState(false));
    }
  };

  const startStep = () => {
    setFormStep(1);
  };

  const setRewardType = (step: number) => {
    setFormStep(step);
  };

  const goBack = () => {
    setFormStep(3);
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
      case 8:
        return <AlreadyIssuedStep />;

      case 7:
        return <ErrorStep />;

      case 6:
        return <FinalStep />;

      case 5:
        return (
          <NFTForm
            backBtnCallback={goBack}
            nextBtnCallback={sendReward}
            inputHandle={setNearWallet}
            inputValue={wallet}
          />
        );

      case 4:
        return (
          <DonationForm
            backBtnCallback={goBack}
            nextBtnCallback={collectEmail}
            inputHandle={setUserEmail}
            inputValue={email}
          />
        );

      case 3:
        return <RewardForm nextBtnCallback={setRewardType} backBtnCallback={stepBack} />;

      case 2:
        return (
          <NameForm
            inputHandle={setUserName}
            inputValue={username}
            backBtnCallback={goToBeginig}
            nextBtnCallback={goToReward}
          />
        );

      case 1:
        return <StorePresence backBtnCallback={goToStart} nextBtnCallback={goToName} />;

      default:
        return <Introduction btnCallback={startStep} />;
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
