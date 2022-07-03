/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import AppLayout from '../components/appLayout';
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
    <AppLayout>
      <div className="grid place-items-center h-screen">{!is_active ? <NewEventForm /> : <EventsTable />}</div>
    </AppLayout>
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
