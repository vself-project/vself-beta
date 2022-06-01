import '../styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import type { AppProps, NextWebVitalsMetric } from 'next/app';

import { withTRPC } from '@trpc/next';
import { AppRouter } from './api/trpc/[trpc]';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';

import Head from 'next/head';

import { store } from '../store';

import Header from '../components/header';
import { Wrapper } from '@googlemaps/react-wrapper';
// import AppLayout from '../components/appLayout';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <Provider store={store}>
      <Head>
        <title>Hashdox</title>
        <meta name="description" content="instant and spoof-proof registration of metadata and image hashing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <AppLayout> */}
      <ThemeProvider attribute="class">
        <Wrapper apiKey={String(process.env.GOOGLE_MAPS_API_KEY)}>
          <Header />
          <div className="dark:bg-black text-gray-900 dark:text-white">
            <AnyComponent {...pageProps} />
          </div>
        </Wrapper>
      </ThemeProvider>
      {/* </AppLayout> */}
    </Provider>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log('metric: ', metric);
}

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
