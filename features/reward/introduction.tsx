import React from 'react';
import Link from 'next/link';

interface IntroductionProps {
  btnCallback: () => void;
}

const Introduction: React.FC<IntroductionProps> = ({ btnCallback }) => {
  return (
    <>
      <h2 className="my-5">Join Hashd0X and support Ukraine</h2>

      <p>
        Hashd0x is a platform for instant and fraud-proof registration of images and their metadata on the NEAR
        blockchain. The app is addressing the problem of fake news and the falsification of facts about war consequences
        across Ukraine. It started as a collaboration of the vSelf team and Egor Kraft&apos;s art project Proof-of-War.
      </p>

      <p className="my-5">
        Now, we invite <b>you</b> to join our project and help us create a secure environment to share evidence of what
        you are witnessing. We will ask you to download and try our application. To celebrate your contribution, choose
        one of two options: we send you an NFT-gift, or we donate $0.5 NEAR to the{' '}
        <Link href="https://unchain.fund/" passHref>
          <a target="_blank" rel="noopener noreferrer">
            <span className="hover:text-gray-600 underline underline-offset-2 cursor-pointer">Unchain</span>
          </a>
        </Link>{' '}
        fund.
      </p>
      <button type="button" className="text-black bg-white uppercase px-5" onClick={btnCallback}>
        Start
      </button>
    </>
  );
};

export default Introduction;
