import type { NextPage } from 'next';
import * as nearAPI from "near-api-js";
import { Contract } from 'near-api-js';

import { mockUserAccount } from '../../mockData/mockUserAccount';

const { generateSeedPhrase } = require('near-seed-phrase');
const { connect, WalletConnection, keyStores, KeyPair, utils } = nearAPI;

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
  console.log(result);
  console.log(seedPhrase);

  return { result, seedPhrase};
}

const LinkDrop: NextPage = () => {
  const someContractMethod = async () => {    
    const new_account_id = "hashdox6.testnet";
    const { result, seedPhrase } = await createAccount(credentials.account_id, new_account_id, '1');
    return;
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center text-black">
        <button type="button" onClick={someContractMethod}>
          Claim Near Account
        </button>
      </div>
    </div>
  );
};

export default LinkDrop;
