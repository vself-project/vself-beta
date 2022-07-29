/* eslint-disable @typescript-eslint/no-var-requires */
// import * as nearAPI from 'near-api-js';
import { Near, Account, keyStores, Contract, KeyPair, connect, WalletConnection, utils } from 'near-api-js';
import { isEnvProd } from '.';
import getConfig from './near';
const { generateSeedPhrase }: any = require('near-seed-phrase');
// Mocks
import { mockMainNetUserAccount, mockUserAccount } from '../mockData/mockUserAccount';

// export const network_id = isEnvProd ? 'mainnet' : 'testnet';
export const network_id = 'testnet';
// const connected_user = isEnvProd ? mockMainNetUserAccount : mockUserAccount;
const connected_user = mockUserAccount;
// Wallet credentials
const credentials = {
  account_id: String(connected_user.account_id),
  public_key: connected_user.public_key,
  private_key: String(connected_user.private_key),
};

export const getConnectedContract = async (contractName: string, contractMethods: any) => {
  const { InMemoryKeyStore } = keyStores;

  // Create keyStore object
  const keyStore = new InMemoryKeyStore();
  const { nodeUrl, networkId } = getConfig(network_id);
  keyStore.setKey(networkId, credentials.account_id, KeyPair.fromString(credentials.private_key));

  // Add access key into calling contract account
  const { connection } = new Near({
    networkId,
    nodeUrl,
    deps: { keyStore },
    headers: {},
  });

  const account: any = new Account(connection, credentials.account_id);

  // Create callable contract instance
  const contract: any = new Contract(account, contractName, contractMethods);

  return { contract, account };
};

export const getAccountAndContract = async (contractName: string, contractMethods: any) => {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();
  const config = getConfig(network_id);

  const near = await connect({
    ...config,
    networkId: network_id,
    keyStore,
    headers: {},
  });

  const wallet = new WalletConnection(near, '');
  const isSignedIn = wallet.isSignedIn();

  const signOut = () => {
    wallet.signOut();
  };

  const signIn = () => {
    wallet.requestSignIn({ contractId: contractName });
  };

  const walletAccountId = wallet.getAccountId();

  const account: any = await near.account(walletAccountId);

  const contract: any = new Contract(account, contractName, contractMethods);

  return { account, contract, signOut, signIn, walletAccountId, isSignedIn };
};

export const createNearAccount = async (newAccountId: string, contractName: string, contractMethods: any) => {
  const config = getConfig(network_id);
  const amount = '0.01';
  // Prepare keystore and funding account
  const keyStore = new keyStores.InMemoryKeyStore();
  await keyStore.setKey(config.networkId, credentials.account_id, KeyPair.fromString(credentials.private_key));

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
  const creatorAccount = await near.account(credentials.account_id);

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
