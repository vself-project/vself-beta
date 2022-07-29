import type { NextPage } from 'next';
import Link from 'next/link';
import AppLayout from '../../components/appLayout';
import { useAppSelector } from '../../hooks';

const AuthPage: NextPage = () => {
  const { account_id } = useAppSelector((state) => state.userAccountReducer);

  return (
    <AppLayout>
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
            <Link href={`unitydl://mylink?${account_id}`} passHref={true}>
              <span className="inline-block px-6 py-2.5 bg-zinc-300 text-black hover:text-zinc-300 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-zinc-600 hover:shadow-lg focus:bg-zinc-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-800 active:shadow-lg transition duration-150 ease-in-out">
                Sign In
              </span>
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AuthPage;
