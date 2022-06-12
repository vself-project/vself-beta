// import * as nearAPI from 'near-api-js';
import { Near, Account, keyStores, Contract, KeyPair } from 'near-api-js';
import getConfig from '../config/near';
import { Endpoints } from '../constants/endpoints';
// Mocks
import { mockMainNetUserAccount } from '../mockData/mockUserAccount';

// Constants
const contractName = Endpoints.MAINNET_POW_PRIZES_CONTRACT_NAME;
const contractMethods = {
  viewMethods: [],
  changeMethods: ['send_reward'],
};

export const getConnectedContract = async () => {
  const { InMemoryKeyStore } = keyStores;
  // Wallet credentials
  const credentials = {
    account_id: mockMainNetUserAccount.account_id,
    public_key: mockMainNetUserAccount.public_key,
    private_key: String(mockMainNetUserAccount.private_key),
  };
  // Create keyStore object
  const keyStore = new InMemoryKeyStore();
  const { nodeUrl, networkId } = getConfig('mainnet');
  keyStore.setKey(networkId, credentials.account_id, KeyPair.fromString(credentials.private_key));

  // Add access key into calling contract account
  const { connection } = new Near({
    networkId,
    nodeUrl,
    deps: { keyStore },
    headers: {},
  });

  const account = new Account(connection, credentials.account_id);

  // Create callable contract instance
  const contract = new Contract(account, contractName, contractMethods);
  return { contract, account };
};
