import * as nearAPI from 'near-api-js';
import getConfig from '../config/near';
import { Endpoints } from '../constants/endpoints';

// Constants
const contractName = Endpoints.TESTNET_POW_CONTRACT_NAME;
const accountName = 'pow_v1.sergantche.testnet';
const contractMethods = 
{
  viewMethods: ['get_evidences', 'version'],
  changeMethods: ['upload_evidence'],
}

export const getConnectedContract = async () => {
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
  const { nodeUrl, networkId } = getConfig('testnet');
  keyStore.setKey(
    networkId,
    accountName,
    KeyPair.fromString(credentials.private_key)
  );

  // Add access key into calling contract account
  const { connection } = new Near({
    networkId,
    nodeUrl,
    deps: { keyStore },
  });
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
  return contract;
};