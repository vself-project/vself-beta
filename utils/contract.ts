// import * as nearAPI from 'near-api-js';
import { Near, Account, keyStores, Contract, KeyPair } from 'near-api-js';
import getConfig from '../config/near';
import { Endpoints } from '../constants/endpoints';
import fs from 'fs';

// Constants
const contractName = Endpoints.TESTNET_POW_CONTRACT_NAME;
const accountName = 'pow_v1.sergantche.testnet';
const contractMethods = {
  viewMethods: ['get_evidences', 'version'],
  changeMethods: ['upload_evidence'],
};

export const getConnectedContract = async () => {
  const { InMemoryKeyStore } = keyStores;

  // Read wallet credentials
  const credentials = JSON.parse(String(fs.readFileSync(`./creds/${accountName}.json`)));

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
  const account = new Account(connection, accountName);

  // Create callable contract instance
  const contract = new Contract(account, contractName, contractMethods);
  return { contract, account };
};
