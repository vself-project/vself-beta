// import * as nearAPI from 'near-api-js';
import { Near, Account, keyStores, Contract, KeyPair } from 'near-api-js';
import getConfig from '../config/near';
import { Endpoints } from '../constants/endpoints';
// Mocks
import { mockMainNetUserAccount } from '../mockData/mockUserAccount';

// Constants
const contractName = Endpoints.MAINNET_CONTRACT_URI;
const contractMethods = {
  viewMethods: ['version', 'is_active', 'get_actions', 'get_event_data', 'get_event_stats', 'get_user_balance_extra'],
  changeMethods: ['start_event', 'stop_event', 'checkin'],
};

export const getEventsConnectedContract = async () => {
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
  keyStore.setKey(networkId, mockMainNetUserAccount.account_id, KeyPair.fromString(credentials.private_key));

  // Add access key into calling contract account
  const { connection } = new Near({
    networkId,
    nodeUrl,
    deps: { keyStore },
    headers: {},
  });

  const account = new Account(connection, mockMainNetUserAccount.account_id);

  // Create callable contract instance
  const contract = new Contract(account, contractName, contractMethods);
  return { contract, account };
};
