/* eslint-disable @typescript-eslint/no-var-requires */
const nacl = require('tweetnacl');
const { createHash } = require('crypto');
const { providers } = require('near-api-js');
const { encode } = require('js-base64');
import { connect, ConnectConfig, keyStores, Contract, WalletConnection, utils } from 'near-api-js';
import Resizer from 'react-image-file-resizer';

import { Endpoints } from '../constants/endpoints';
import { mockUserAccount } from '../mockData/mockUserAccount';

// SHA-256 hash
export const hash = (msg: string) => {
  return createHash('sha256').update(msg).digest('hex');
};

export const amountInYocto = (amount: string) => utils.format.parseNearAmount(amount);
export const amountInNEAR = (amount: string) => utils.format.formatNearAmount(amount);

const provider = new providers.JsonRpcProvider(Endpoints.TESTNET_RPC_ENDPOINT_URI);

// const contractEndPoint =
//   process.env.NODE_ENV !== 'production' ? Endpoints.TESTNET_CONTRACT_URI : Endpoints.MAINNET_CONTRACT_URI;

export const getContractState = async (methodName: string): Promise<boolean> => {
  try {
    const request = {
      request: '{}',
    };
    const encodedText = encode(JSON.stringify(request));
    const rawResult = await provider.query({
      request_type: 'call_function',
      account_id: Endpoints.TESTNET_CONTRACT_URI,
      method_name: methodName,
      args_base64: encodedText,
      finality: 'optimistic',
    });
    // format result
    const result = JSON.parse(Buffer.from(rawResult.result).toString());
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getRandomHashString = (): string => {
  const randomBytes = nacl.randomBytes(64);
  return Array.from(randomBytes, function (byte: number) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
};

export const getNearAccountAndContract = async (account_id: string): Promise<any> => {
  const config: ConnectConfig = {
    networkId: 'testnet',
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    headers: {},
  };
  const near = await connect(config);

  const account = await near.account(account_id);

  const contract = new Contract(
    account, // the account object that is connecting
    Endpoints.TESTNET_CONTRACT_URI,
    {
      // name of contract you're connecting to
      viewMethods: ['is_active', 'get_actions', 'get_event_data', 'get_event_stats'], // view methods do not change state but usually return a value
      changeMethods: ['start_event', 'stop_event'], // change methods modify state
    }
  );

  return { account, contract };
};

export const getPOWAccountAndContract = async (): Promise<any> => {
  const config: ConnectConfig = {
    networkId: 'testnet',
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    headers: {},
  };
  const near = await connect(config);

  const wallet = new WalletConnection(near, '');

  if (!wallet.isSignedIn()) return wallet.requestSignIn();

  const signOut = () => {
    wallet.signOut();
  };

  const signIn = () => {
    wallet.requestSignIn({ contractId: Endpoints.TESTNET_POW_CONTRACT_NAME });
  };

  const walletAccountId = wallet.getAccountId();

  const account = await near.account(walletAccountId);

  const contract = new Contract(
    wallet.account(), // the account object that is connecting
    Endpoints.TESTNET_POW_CONTRACT_NAME,
    {
      // name of contract you're connecting to
      viewMethods: ['get_evidences', 'version', 'get_evidences_amount'], // view methods do not change state but usually return a value
      changeMethods: ['upload_evidence'], // change methods modify state
      sender: wallet.account(),
    }
  );

  return { account, contract, signOut, signIn, walletAccountId };
};

export const getNftTokens = async (account_id: string): Promise<object[]> => {
  try {
    const request = { account_id };
    const encodedText = encode(JSON.stringify(request));

    const rawResult = await provider.query({
      request_type: 'call_function',
      account_id,
      method_name: 'nft_tokens_for_owner',
      args_base64: encodedText,
      finality: 'optimistic',
    });

    // format result
    const res = JSON.parse(Buffer.from(rawResult.result).toString());
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const formatTimeStampToLocaleDateString = (timestamp: number) => {
  return new Date(timestamp / 1000000).toLocaleDateString();
};

export const formatTimeStampToLocaleTimeString = (timestamp: number) => {
  return new Date(timestamp / 1000000).toLocaleTimeString();
};

export const resizeFile = (file: File): Promise<File> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      450,
      450,
      'PNG',
      100,
      0,
      (uri: any) => {
        resolve(uri);
      },
      'file',
      450,
      450
    );
  });

export const getCoords = async () => {
  try {
    const pos: any = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return {
      long: pos.coords.longitude,
      lat: pos.coords.latitude,
    };
  } catch (err) {
    return null;
  }
};
