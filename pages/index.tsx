/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import AppLayout from '../components/appLayout';
import Header from '../components/header';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import { useTranslation } from 'next-i18next';
// import Link from 'next/link';
import NewEventForm from '../features/event-form';
import EventsTable from '../features/events-table';
import { useAppSelector } from '../hooks';

const Home: NextPage = () => {
  // const { t } = useTranslation(['hashdox', 'common']);
  const { is_active } = useAppSelector((state) => state.eventReducer);
  return (
    <>
      <Header />
      <div className="grid place-items-center h-screen">
        <EventsTable />
      </div>
    </>
  );
};

export default Home;

// export async function getStaticProps({ locale }: any) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale || 'en', ['common', 'hashdox'])),
//     },
//   };
// }
