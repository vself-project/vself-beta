// import * as nearAPI from 'near-api-js';
import { Near, Account, keyStores, Contract, KeyPair } from 'near-api-js';
import getConfig from '../config/near';
import { Endpoints } from '../constants/endpoints';
// Mocks
import { mockUserAccount } from '../mockData/mockUserAccount';

// Constants
const contractName = Endpoints.LINKDROP_TESTNET_CONTRACT_URI;
const contractMethods = {
  viewMethods: ['get_key_balance'],
  changeMethods: [
    'send',
    'claim',
    'create_account_and_claim',
    'create_account',
    'on_account_created',
    'on_account_created_and_claimed',
  ],
};

export const getLinkDropConnectedContract = async () => {
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
