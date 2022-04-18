import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import * as nearAPI from 'near-api-js';
import getConfig from '../../../config/near';
import { Endpoints } from '../../../constants/endpoints';

const contractName = Endpoints.TESTNET_POW_CONTRACT_NAME;
const accountName = 'pow_v1.sergantche.testnet';
const contractMethods = 
{
  viewMethods: ['get_evidences', 'version'],
  changeMethods: ['upload_evidence'],
}

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
const fs = require("fs");
const credentials = JSON.parse(
  fs.readFileSync(
    `./creds/${accountName}.json`    
  )
);

// Create keyStore object
const keyStore = new InMemoryKeyStore();
const nearConfig = getConfig('testnet');
const { nodeUrl, networkId } = nearConfig;
keyStore.setKey(
  networkId,
  accountName,
  KeyPair.fromString(credentials.private_key)
);

// Add access key into calling contract account
const near = new Near({
  networkId,
  nodeUrl,
  deps: { keyStore },
});
const { connection } = near;
const contractAccount = new Account(connection, accountName);
contractAccount.addAccessKey = (publicKey) =>
  contractAccount.addKey(
    publicKey,
    contractName,
    contractMethods.changeMethods,
    parseNearAmount("0.1")
  );

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
  .query('upload-evidence', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    async resolve({ input }) {
      await contract.upload_evidence(
        {
          evidence: {
            media_hash: 'hashhash8',
            metadata: JSON.stringify({
              author: 'Serg',
              uploadThrough: 'server',
            }),
          },
        },
        "300000000000000" // attached GAS (optional)
      );
      let response = await contract.get_evidences({
        from_index: 5,
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