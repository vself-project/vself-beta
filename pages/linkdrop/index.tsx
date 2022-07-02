import type { NextPage } from 'next';
import { getLinkDropConnectedContract } from '../../utils/linkdrop-contract';

const LinkDrop: NextPage = () => {
  const someContractMethod = async () => {
    const { contract } = await getLinkDropConnectedContract();
    // contract.method_name();
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
