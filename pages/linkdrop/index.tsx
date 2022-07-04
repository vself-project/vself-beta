import type { NextPage } from 'next';
import * as nearAPI from "near-api-js";
import { Near, Account, keyStores, Contract, KeyPair } from 'near-api-js';

import { mockUserAccount } from '../../mockData/mockUserAccount';

const { parseSeedPhrase, generateSeedPhrase } = require('near-seed-phrase');
const { connect, WalletConnection, keyStores, KeyPair, utils } = nearAPI;

// Wallet credentials (v1.event.vself.near) // sega
const credentials = {
  account_id: mockUserAccount.account_id,
  public_key: mockUserAccount.public_key,
  private_key: String(mockUserAccount.private_key),
};

const contractName = "testnet"; // mainnet: "near"
const contractMethods = {
  viewMethods: [''],
  changeMethods: [
    'create_account'
  ],
};

const config = { // mainnet different
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

// and return mnemonic phrase
async function createAccount(creatorAccountId, newAccountId, amount) {
  // prepare keystore and funding account
  const keyStore = new keyStores.InMemoryKeyStore();
  await keyStore.setKey(config.networkId, creatorAccountId, KeyPair.fromString(credentials.private_key));

  // Generate new keypair
  // to create a seed phrase with its corresponding Keys
  const {seedPhrase, publicKey, secretKey} = generateSeedPhrase();
  // const keyPair = KeyPair.fromString(secretKey);
  // await keyStore.setKey(config.networkId, newAccountId, keyPair);

  const near = await connect({ ...config, keyStore });
  const creatorAccount = await near.account(creatorAccountId);

  // Create callable contract instance
  const root_contract = new Contract(creatorAccount, contractName, contractMethods);
  console.log(root_contract);
  const result = await root_contract.create_account(
    {
      new_account_id: newAccountId,
      new_public_key: publicKey,
    },
    "300000000000000",
    utils.format.parseNearAmount(amount)
  );
  console.log(result);
  console.log(seedPhrase);
}

const LinkDrop: NextPage = () => {
  const someContractMethod = async () => {    
    const new_account_id = "hashdox4.testnet";
    createAccount(credentials.account_id, new_account_id, '10');
    return;

    const keyPair1 = KeyPair.fromRandom('ED25519'); 
    const pk1 = keyPair1.getPublicKey();
    const privkey1 = keyPair1.secretKey;
    const implicit_account = Buffer.from(pk1.data).toString('hex');        
    contract.send({public_key: pk1.toString()}, 300000000000000, utils.format.parseNearAmount('1.1'));

    //const near = await connect({ ...config, keyStore });
    //const creatorAccount = await near.account(creatorAccountId);

    // input (TODO extract from request and form)
    //const privkey1 = "ed25519:2Egb8j8nnhSrbpgoewCZDfzQFx3rP5mosHnEc3M1xQsD6cxwqn6xhGKZL3rjQ9c1smDQwetUowzbAyoJLiFY3sBb";    

    // 0. Receives link to the wallet with privkey1.

    // creates keyStore from a private key string
    // you can define your key here or use an environment variable    
    const keyStore = new keyStores.InMemoryKeyStore();    
    // creates a public / private key pair using the provided private key
    const keyPair = KeyPair.fromString(privkey1);    
    // const privkey1 = keyPair.secretKey;
    // const pk1 = keyPair.publicKey;
    // const account_id = "beda9fead6422cb217d20097f11a016ca521677eacb3c47ce1dfcfdd8c5c582e";
    // //const account_id = nearAPI.utils.PublicKey.fromString(pk1).data.hexSlice();
    // console.log(pk1);
    // console.log(privkey1);
    // console.log(account_id);
    // // adds the keyPair you created to keyStore
    // await keyStore.setKey("testnet", account_id, keyPair);    

    // connect to NEAR and create wallet connection on testnet
        
    const near = await connect(config);
    const account = await near.account(account_id);
    account.addKey(pk1);
    const wallet = new WalletConnection(near);

    console.log(near);
    //await wallet.account().addKey(pk1);
    //const account = await wallet.account();
    

    // 1. Wallet creates new key pair for this user (or they generate it via HSM) (pk2, privkey2)
    const keyRandom = KeyPair.fromRandom("ED25519");
    const pk2 = keyRandom.publicKey;
    const privkey2 = keyRandom.secretKey;
    await account.addKey(pk2);    
    console.log(account);

    // 2. Wallet creates a transaction to linkdrop.create_account_and_claim(new_account_id, pk2).
    //contract.create_account_and_claim(new_account_id, pk2);
    // Contract creates new account with new_account_id name and pk2 as full access key
    // and transfers NEAR that Sender sent.

    //console.log()
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center text-black">
        <button type="button" onClick={someContractMethod}>
          Claim Near Account
        </button>
      </div>
    </div>
  );
};

export default LinkDrop;
