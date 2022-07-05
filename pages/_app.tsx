import '../styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import type { AppProps, NextWebVitalsMetric } from 'next/app';

import { withTRPC } from '@trpc/next';
import { AppRouter } from './api/trpc/[trpc]';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';

import Head from 'next/head';

import { store } from '../store';

// import Header from '../components/header';
// import { Wrapper } from '@googlemaps/react-wrapper';
// import AppLayout from '../components/appLayout';
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { getNearAccountAndContract } from '../utils';
import { signInApp, setAppLoadingState } from '../store/reducers/appStateReducer/actions';
import { setEventStatus } from '../store/reducers/eventReducer/actions';
import { getUserAccountData } from '../store/reducers/userAccountReducer/actions';

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;

  useEffect(() => {
    const initVselfWebApp = async () => {
      try {
        const { isSignedIn, walletAccountId, contract } = await getNearAccountAndContract();
        console.log('isSignedIn: ', contract);
        if (isSignedIn) {
          store.dispatch(signInApp());
          store.dispatch(getUserAccountData({ account_id: walletAccountId }));
        }
        console.log('in the middle');
        const is_active = await contract.is_active();
        console.log('is_active: ', is_active);
        store.dispatch(setEventStatus(is_active));
      } catch (err) {
        console.log('Cannot connect to contract: ', err);
      } finally {
        setTimeout(() => {
          store.dispatch(setAppLoadingState(false));
        }, 1000);
      }
    };
    initVselfWebApp();
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>VSELF</title>
        <meta name="description" content="vSelf: web3 identity wallet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <AppLayout> */}
      <ThemeProvider attribute="class">
        {/* <Wrapper apiKey={String(process.env.GOOGLE_MAPS_API_KEY)}> */}
        {/* <Header /> */}
        <div
          className="text-gray-900 dark:text-white font-druk"
          style={{ backgroundImage: 'url(/gradient2.png)', backgroundSize: 'cover' }}
        >
          <AnyComponent {...pageProps} />
        </div>
        {/* </Wrapper> */}
      </ThemeProvider>
      {/* </AppLayout> */}
    </Provider>
  );
}

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log('metric: ', metric);
// }

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(appWithTranslation(MyApp));
