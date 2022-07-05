/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import type { NextPage } from 'next';
import * as nearAPI from 'near-api-js';
import { Contract } from 'near-api-js';
import { StylesCSS } from '../../constants/styles';
import { checkNearAccount } from '../../utils';

import { mockUserAccount, mockMainNetUserAccount } from '../../mockData/mockUserAccount';

const { generateSeedPhrase } = require('near-seed-phrase');
const { connect, WalletConnection, keyStores, KeyPair, utils } = nearAPI;

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

// Digits (0-9)
// Characters (_-) can be used as separators
// Your account ID CANNOT contain:

// Characters "@" or "."
// Fewer than 2 characters
// More than 64 characters (including .near)'

// Wallet credentials TESTNET/MAINNET
// const credentials = {
//   account_id: mockUserAccount.account_id,
//   public_key: mockUserAccount.public_key,
//   private_key: String(mockUserAccount.private_key),
// };
const credentials = {
  account_id: mockMainNetUserAccount.account_id,
  public_key: mockMainNetUserAccount.public_key,
  private_key: String(mockMainNetUserAccount.private_key),
};
console.log({ mockMainNetUserAccount });

// TESTNET/MAINNET
// const contractName = "testnet"; // testnet
const contractName = 'near'; // mainnet
const contractMethods = {
  viewMethods: [''],
  changeMethods: ['create_account'],
};

// TESTNET/MAINNET
// const config = { // testnet
//   networkId: "testnet",
//   nodeUrl: "https://rpc.testnet.near.org",
//   walletUrl: "https://wallet.testnet.near.org",
//   helperUrl: "https://helper.testnet.near.org",
//   explorerUrl: "https://explorer.testnet.near.org",
// };
const config = {
  // mainnet
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
  walletUrl: 'https://wallet.near.org',
  helperUrl: 'https://helper.mainnet.near.org',
  explorerUrl: 'https://explorer.near.org',
};

// Return boolean result and mnemonic phrase
const createAccount = async (creatorAccountId: any, newAccountId: any, amount: any) => {
  // Prepare keystore and funding account
  const keyStore = new keyStores.InMemoryKeyStore();
  await keyStore.setKey(config.networkId, creatorAccountId, KeyPair.fromString(credentials.private_key));

  // Generate new keypair
  // to create a seed phrase with its corresponding Keys
  const { seedPhrase, publicKey, secretKey } = generateSeedPhrase();
  // const keyPair = KeyPair.fromString(secretKey);
  // await keyStore.setKey(config.networkId, newAccountId, keyPair);

  const near = await connect({
    ...config,
    keyStore,
    headers: {},
  });
  const creatorAccount = await near.account(creatorAccountId);

  // Create callable contract instance
  const root_contract: any = new Contract(creatorAccount, contractName, contractMethods);
  const result = await root_contract.create_account(
    {
      new_account_id: newAccountId,
      new_public_key: publicKey,
    },
    '300000000000000',
    utils.format.parseNearAmount(amount)
  );

  return { result, seedPhrase };
};

const LinkDrop: NextPage = () => {
  const [nearid, setNearid] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [seed, setSeed] = React.useState(null);
  const [showSeed, setShowSeed] = React.useState(true);

  const FAILURE_MESSAGE =
    'Sorry, it seems desired name has already been taken or we ran out of free accounts. ' +
    'Please contact us on social media or email info@vself.app and we will guide you through onboarding.';
  const SUCCESS_MESSAGE =
    'Success! You have claimed your free NEAR account!' +
    ' Please dont forget to write down your mnemonic phrase and use official NEAR wallet in the future';

  const ONBOARDING_COST = 1.17923 - 0;

  // Call contract method
  const callCreateAccount = async () => {
    try {
      const amount = '0.01';

      // If account is busy show the message
      // Some problem with COARS
      // TESTNET/MAINNET
      // const accountExists = await checkNearAccount(nearid, 'testnet');
      // const accountExists = await checkNearAccount(nearid, 'mainnet');
      // if (accountExists) {
      //   setMessage('This account is busy');
      //   setTimeout(() => {setMessage('')}, 5000);
      //   return;
      // }

      const { result, seedPhrase } = await createAccount(credentials.account_id, nearid, amount);
      if (result) {
        setMessage(SUCCESS_MESSAGE);
        setSeed(seedPhrase);
        setTimeout(() => {
          setMessage('');
        }, 10000);
      } else {
        setMessage(FAILURE_MESSAGE);
        setTimeout(() => {
          setMessage('');
        }, 10000);
      }
      return;
    } catch (err) {
      console.log(err);
      setMessage(FAILURE_MESSAGE);
      setTimeout(() => {
        setMessage('');
      }, 10000);
    }
  };

  // User ID input handler
  const onEventNearIDChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    setNearid(value);
  };

  // TESTNET/MAINNET
  //const placeholder = 'new_account.testnet';
  const placeholder = 'new_account.near';
  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center text-black">
        <div className="w-96 mb-8">{MAIN_TEXT}</div>
        <div className="w-96 mb-8">
          To operate your newly registered account use your mnemonic to login to{' '}
          <a href="https://wallet.near.org/">official NEAR wallet</a>
        </div>

        <input
          autoComplete="off"
          type="text"
          name="nearid"
          onChange={onEventNearIDChange}
          value={nearid}
          className={`${StylesCSS.INPUT}`}
          placeholder={placeholder}
        />
        <div className="w-96 h-8">{message}</div>
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
            <button
              style={{
                fontSize: 20,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: 6,
                padding: '6px 14px 6px 14px',
              }}
              type="button"
              onClick={callCreateAccount}
            >
              Claim Near Account
            </button>
          </div>
        ) : (
          <div>
            {showSeed && <div className="w-96 mb-2">{seed}</div>}
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
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: 5, padding: '5px 10px 5px 10px' }}
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
  );
};

export default LinkDrop;
