import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render(): React.ReactElement {
    return (
      <Html>
        <Head>{/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta> */}</Head>
        <body className="bg-black dark:bg-black text-gray-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
