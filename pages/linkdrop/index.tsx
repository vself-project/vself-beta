import React from 'react';
import type { NextPage } from 'next';
import * as nearAPI from "near-api-js";
import { Contract } from 'near-api-js';
import { StylesCSS } from '../../constants/styles';
import { checkNearAccount } from '../../utils';

import { mockUserAccount } from '../../mockData/mockUserAccount';

const { generateSeedPhrase } = require('near-seed-phrase');
const { connect, WalletConnection, keyStores, KeyPair, utils } = nearAPI;

const MAIN_TEXT = 'If you want to create near account or If you want to create near account or If you want to create near account. Then just use this simple form.'

// Wallet credentials (caesai.testnet) // sega
const credentials = {
  account_id: mockUserAccount.account_id,
  public_key: mockUserAccount.public_key,
  private_key: String(mockUserAccount.private_key),
};

const contractName = "testnet"; // mainnet: "near"
const contractMethods = {
  viewMethods: [''],
  changeMethods: [
    'create_account'
  ],
};

const config = { // mainnet different
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

// Return boolean result and mnemonic phrase
const createAccount = async (creatorAccountId: any, newAccountId: any, amount: any) => {
  // Prepare keystore and funding account
  const keyStore = new keyStores.InMemoryKeyStore();
  await keyStore.setKey(config.networkId, creatorAccountId, KeyPair.fromString(credentials.private_key));

  // Generate new keypair
  // to create a seed phrase with its corresponding Keys
  const {seedPhrase, publicKey, secretKey} = generateSeedPhrase();
  // const keyPair = KeyPair.fromString(secretKey);
  // await keyStore.setKey(config.networkId, newAccountId, keyPair);

  const near = await connect({ ...config, keyStore });
  const creatorAccount = await near.account(creatorAccountId);

  // Create callable contract instance
  const root_contract = new Contract(creatorAccount, contractName, contractMethods);
  console.log(root_contract);
  const result = await root_contract.create_account(
    {
      new_account_id: newAccountId,
      new_public_key: publicKey,
    },
    "300000000000000",
    utils.format.parseNearAmount(amount)
  );

  return { result, seedPhrase};
}

const LinkDrop: NextPage = () => {
  const [nearid, setNearid] = React.useState('');
  const [message, setMessage] = React.useState('');

  // Call contract method 
  const callCreateAccount = async () => {    
    const amount = '1';

    // If account is busy show the message
    // const accountExists = await checkNearAccount(nearid, 'testnet');
    // if (accountExists) {
    //   setMessage('This account is busy');
    //   setTimeout(() => {setMessage('')}, 5000);
    //   return;
    // }

    const { result, seedPhrase } = await createAccount(credentials.account_id, nearid, amount);
    if (result) {
      setMessage('Success');
      setTimeout(() => {setMessage('')}, 5000);
    } else {
      setMessage('Failure');
      setTimeout(() => {setMessage('')}, 5000);
    }
    console.log({ result });
    console.log({ seedPhrase });
    return;
  };

  // User ID input handler
  const onEventNearIDChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    setNearid(value);
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center text-black">
        <div className="w-96 mb-8">
          {MAIN_TEXT}
        </div>
        <input
            autoComplete="off"
            type="text"
            name="nearid"
            onChange={onEventNearIDChange}
            value={nearid}
            className={`${StylesCSS.INPUT}`}
            placeholder="new_account.testnet"
          />
        <div className="w-96 h-8">
          {message}
        </div>
        <button type="button" onClick={callCreateAccount}>
          Claim Near Account
        </button>
      </div>
    </div>
  );
};

export default LinkDrop;
