import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import * as nearAPI from 'near-api-js';
import { readFileSync } from 'fs';

import getConfig from '../../../config/near';
import { Endpoints } from '../../../constants/endpoints';

const contractName = Endpoints.TESTNET_POW_CONTRACT_NAME;
const accountName = 'pow_v1.sergantche.testnet';
const contractMethods = {
  viewMethods: ['get_evidences', 'version', 'get_evidences_amount'],
  changeMethods: ['upload_evidence'],
};

const {
  keyStores: { InMemoryKeyStore },
  Near,
  Account,
  Contract,
  KeyPair,
  utils: {
    format: { parseNearAmount },
  },
} = nearAPI;

// Read wallet credentials
const creds = readFileSync(`./creds/${accountName}.json`);
const credentials = JSON.parse(String(creds));

// Create keyStore object
const keyStore = new InMemoryKeyStore();
const { nodeUrl, networkId } = getConfig('testnet');
keyStore.setKey(networkId, accountName, KeyPair.fromString(credentials.private_key));

// Add access key into calling contract account
const { connection } = new Near({
  networkId,
  nodeUrl,
  deps: { keyStore },
  headers: {},
});
const contractAccount = new Account(connection, accountName);

// Create callable contract instance
const contract = new Contract(contractAccount, contractName, contractMethods);

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
  // Request example http://localhost:3000/api/trpc/upload-evidence?data='{"hash":"lkhqwfbwemnkjeh12hef98","name":"Alex","time":"4/12/2022 10:22:04 PM","location":"unknown"}'
  .query('upload-evidence', {
    input: String,
    async resolve(req) {
      console.log(req);
      // await contract.upload_evidence(
      //   {
      //     evidence: {
      //       media_hash: 'hashhash9',
      //       metadata: JSON.stringify({
      //         author: 'Serg',
      //         uploadThrough: 'server',
      //       }),
      //     },
      //   },
      //   "300000000000000" // attached GAS (optional)
      // );
      // let response = await contract.get_evidences({
      //   from_index: 5,
      //   limit: 10
      // });
      // console.log(response);
      return {
        success: true,
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
