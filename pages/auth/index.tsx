import { useEffect } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
// import { useAppSelector } from '../../hooks';
import { getAccountAndContract } from '../../utils/contract';
import { mainContractMethods, mainContractName } from '../../utils/contract-methods';
import { useRouter } from 'next/router';

const AuthPage: NextPage = () => {
  // const { account_id } = useAppSelector((state) => state.userAccountReducer);
  const router = useRouter();
  const { account_id } = router.query;
  const signInToNear = async () => {
    const { signIn } = await getAccountAndContract(mainContractName, mainContractMethods);
    signIn();
  };
  useEffect(() => {
    if (account_id !== undefined) {
      window.location.href = `unitydl://mylink?${account_id}`;
    }
  }, [account_id]);
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="text-center">
        <div>
          <Link href="unitydl://mylink?caesai.testnet" passHref={true}>
            <span className="inline-block px-6 py-2.5 bg-zinc-300 text-black hover:text-zinc-300 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-zinc-600 hover:shadow-lg focus:bg-zinc-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-800 active:shadow-lg transition duration-150 ease-in-out">
              Without Sign In
            </span>
          </Link>
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={signInToNear}
            className="inline-block px-6 py-2.5 bg-zinc-300 text-black hover:text-zinc-300 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-zinc-600 hover:shadow-lg focus:bg-zinc-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
