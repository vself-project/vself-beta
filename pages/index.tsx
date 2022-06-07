/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const Home: NextPage = () => {
  const { t } = useTranslation(['hashdox', 'common']);
  return (
    <div className="grid place-items-center h-screen">
      <div className="" style={{ maxWidth: 600 }}>
        <p className="font-rational text-white">{t('paragraph_0')}</p>
        <p className="font-rational my-8 text-white">
          {t('paragraph_1')}{' '}
          <Link href="/upload" passHref>
            <span className="hover:text-gray-600 underline underline-offset-2 cursor-pointer">
              {t('upload', { ns: 'common' })}
            </span>
          </Link>{' '}
          {t('paragraph_2')}{' '}
          <Link href="/dashboard" passHref>
            <span className="hover:text-gray-600 underline underline-offset-2 cursor-pointer">
              {t('dashboard', { ns: 'common' })}
            </span>
          </Link>
        </p>
        <div className="flex justify-between">
          <img src="/applenew.png" alt="AppStore" width={250} style={{ borderRadius: 6 }} />
          <img src="/google.png" alt="Google Play" width={250} style={{ borderRadius: 6 }} />
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'hashdox'])),
    },
  };
}
