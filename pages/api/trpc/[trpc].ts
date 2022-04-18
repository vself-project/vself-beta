import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import * as nearAPI from 'near-api-js';

import getConfig from '../../../config/near';
import { Endpoints } from '../../../constants/endpoints';

//let nearConfig = getConfig('testnet');
//const { nodeUrl, networkId } = nearConfig;
const networkId = "testnet";
const contractName = Endpoints.TESTNET_POW_CONTRACT_NAME;
const ACCOUNT_NAME = 'pow_v1.sergantche.testnet';
const CONTRACT_METHODS = 
{
  viewMethods: ['get_evidences', 'version'],
  changeMethods: ['upload_evidence'],
}

const {
  keyStores: { InMemoryKeyStore },
  connect,
  WalletConnection,
  Near,
  Account,
  Contract,
  KeyPair,
  utils: {
    format: { parseNearAmount },
  },
} = nearAPI;

// Read wallet credentials
const fs = require("fs");
const credentials = JSON.parse(
  fs.readFileSync(
    `./creds/${ACCOUNT_NAME}.json`    
  )
);

// Create keyStore object
const keyStore = new InMemoryKeyStore();
keyStore.setKey(
  networkId,
  ACCOUNT_NAME,
  KeyPair.fromString(credentials.private_key)
);

// NEAR config object
const config = {
  networkId,
  keyStore, 
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

const near = new Near({
  networkId: 'testnet',
  nodeUrl: "https://rpc.testnet.near.org",
  deps: { keyStore },
});

const { connection } = near;
const contractAccount = new Account(connection, ACCOUNT_NAME);
contractAccount.addAccessKey = (publicKey) =>
  contractAccount.addKey(
    publicKey,
    contractName,
    CONTRACT_METHODS.changeMethods,
    parseNearAmount("0.1")
  );

const contract = new Contract(contractAccount, contractName, CONTRACT_METHODS);

// Connect to NEAR and create wallet connection
const createContract = async (nearConfig: any) => {
  const near = await connect(nearConfig);
  const account = await near.account(ACCOUNT_NAME);
  const contract = new Contract(
    account, // the account object that is connecting
    contractName,
    {
      // name of contract you're connecting to
      viewMethods: ['get_evidences', 'version'],
      changeMethods: ['upload_evidence'],
      sender: account, // account object to initialize and sign transactions.
    }
  );
  return contract;
  //const wallet = new WalletConnection(near, null);
}

export const appRouter = trpc
  .router()
  // Hello world endpoint
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {      
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    },
  })
  // Second endpoint
  .query('upload-evidence', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    async resolve({ input }) {
      //const contract = await createContract(config);
      let response = await contract.get_evidences({
        from_index: 0,
        limit: 2
      });
      console.log(credentials);
      console.log(near);
      //console.log(response);
      // await contract.upload_evidence(
      //   {
      //     evidence: {
      //       media_hash: 'hashhash2',
      //       metadata: JSON.stringify({
      //         author: 'Serg',
      //         uploadThrough: 'server',
      //       }),
      //     },
      //   },
      //   "300000000000000" // attached GAS (optional)
      // );
      response = await contract.get_evidences({
        from_index: 4,
        limit: 10
      });
      console.log(response);
      return {
        greeting: `hello ${input?.text ?? 'world 2'}`,
      };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});