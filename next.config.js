// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n,
  env: {
    USER_ACCOUNT_ID: process.env.USER_ACCOUNT_ID,
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    MAINNET_USER_ACCOUNT_ID: process.env.MAINNET_USER_ACCOUNT_ID,
    MAINNET_PUBLIC_KEY: process.env.MAINNET_PUBLIC_KEY,
    MAINNET_PRIVATE_KEY: process.env.MAINNET_PRIVATE_KEY,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },
};
