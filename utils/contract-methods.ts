import { isEnvProd } from '.';
import { Endpoints } from '../constants/endpoints';

// Main Contract Settings
export const mainContractName = isEnvProd ? Endpoints.MAINNET_CONTRACT_URI : Endpoints.TESTNET_CONTRACT_URI;
export const mainContractMethods = {
  // name of contract you're connecting to
  viewMethods: ['version', 'is_active', 'get_actions', 'get_event_data', 'get_event_stats', 'get_user_balance_extra'], // view methods do not change state but usually return a value
  changeMethods: ['start_event', 'stop_event', 'checkin'], // change methods modify state
};

// LinkDrop Settings
export const linkDropName = isEnvProd ? 'near' : 'testnet';
export const linkDropMethods = {
  viewMethods: [''],
  changeMethods: ['create_account'],
};

export const ldName = Endpoints.LINKDROP_TESTNET_CONTRACT_URI;
export const ldMethods = {
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

// HashD0x Contracts
// TODO: Remove

// POW Contract Settings
export const powContractName = Endpoints.TESTNET_POW_CONTRACT_NAME;
export const powContractNameV1 = Endpoints.TESTNET_POW_CONTRACT_NAME_V1;
export const powContractMethods = {
  viewMethods: ['get_evidences', 'version', 'get_evidences_amount'],
  changeMethods: ['upload_evidence'],
};

// POW Reward Contract Settings
export const powRewardContractName = Endpoints.MAINNET_POW_PRIZES_CONTRACT_NAME;
export const powRewardContractMethods = {
  viewMethods: [],
  changeMethods: ['send_reward'],
};
