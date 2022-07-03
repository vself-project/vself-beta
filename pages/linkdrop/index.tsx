import type { NextPage } from 'next';
import { getLinkDropConnectedContract } from '../../utils/linkdrop-contract';
import * as nearAPI from "near-api-js";

const LinkDrop: NextPage = () => {
  const someContractMethod = async () => {
    const { contract } = await getLinkDropConnectedContract();
    const { connect, WalletConnection, keyStores, KeyPair } = nearAPI;

    // input (TODO extract from request and form)
    const privkey1 = "5x8AriK4AenreSFTnixAM6a3PoXXg2iumVh7s8VjimRopgM7osBV2DfUVWzj5wXaHpt44Ydw27WsY9GrBvi8qLzo";
    const new_account_id = "hashd0x.testnet";

    // 0. Receives link to the wallet with privkey1.

    // creates keyStore from a private key string
    // you can define your key here or use an environment variable    
    const keyStore = new keyStores.InMemoryKeyStore();    
    // creates a public / private key pair using the provided private key
    const keyPair = KeyPair.fromString(privkey1);
    // const keyPair = KeyPair.fromRandom('ED25519');
    // const privkey1 = keyPair.secretKey;
    const pk1 = keyPair.publicKey;
    console.log(pk1);
    console.log(privkey1);
    // adds the keyPair you created to keyStore
    await keyStore.setKey("testnet", pk1, keyPair);    

    // connect to NEAR and create wallet connection on testnet
    const config = {
      networkId: "testnet",
      keyStore: keyStore, // use keystore initialized with pk1/privkey1
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };    
    const near = await connect(config);
    const wallet = new WalletConnection(near);
    const account = wallet.account();
    console.log(await account.getAccountDetails());

    // 1. Wallet creates new key pair for this user (or they generate it via HSM) (pk2, privkey2)
    const keyRandom = KeyPair.fromRandom();
    const pk2 = keyRandom.publicKey;
    const privkey2 = keyRandom.secretKey;
    wallet.account().addKey(pk2);

    // 2. Wallet creates a transaction to linkdrop.create_account_and_claim(new_account_id, pk2).
    contract.create_account_and_claim(new_account_id, pk2);
    // Contract creates new account with new_account_id name and pk2 as full access key
    // and transfers NEAR that Sender sent.
  };
  return (
    <div className="grid place-items-center h-screen">
      <div className="text-center text-black">
        <button type="button" onClick={someContractMethod}>
          Generate Linkdrop
        </button>
      </div>
      <div className="text-center text-black">
        <button type="button" onClick={someContractMethod}>
          Claim Near Account
        </button>
      </div>
    </div>
  );
};

export default LinkDrop;
