// import * as nearAPI from 'near-api-js';
import { Near, Account, keyStores, Contract, KeyPair } from 'near-api-js';
import getConfig from '../config/near';
import { Endpoints } from '../constants/endpoints';
// Mocks
import { mockUserAccount } from '../mockData/mockUserAccount';

// Constants
const contractName = Endpoints.TESTNET_POW_PRIZES_CONTRACT_NAME;
const contractMethods = {
  viewMethods: [],
  changeMethods: ['send_reward'],
};

export const getConnectedContract = async () => {
  const { InMemoryKeyStore } = keyStores;

  // Wallet credentials
  const credentials = {
    account_id: mockUserAccount.account_id,
    public_key: mockUserAccount.public_key,
    private_key: String(mockUserAccount.private_key),
  };

  // Create keyStore object
  const keyStore = new InMemoryKeyStore();
  const { nodeUrl, networkId } = getConfig('testnet');
  keyStore.setKey(networkId, mockUserAccount.account_id, KeyPair.fromString(credentials.private_key));

  // Add access key into calling contract account
  const { connection } = new Near({
    networkId,
    nodeUrl,
    deps: { keyStore },
    headers: {},
  });

  const account = new Account(connection, mockUserAccount.account_id);

  // Create callable contract instance
  const contract = new Contract(account, contractName, contractMethods);
  return { contract, account };
};
