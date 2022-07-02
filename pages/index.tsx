/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import { useTranslation } from 'next-i18next';
// import Link from 'next/link';
import NewEventForm from '../features/event-form';
import EventsTable from '../features/events-table';
import { useAppSelector } from '../hooks';

const Home: NextPage = () => {
  // const { t } = useTranslation(['hashdox', 'common']);
  const { is_active } = useAppSelector((state) => state.eventReducer);
  return <div className="grid place-items-center h-screen">{!is_active ? <NewEventForm /> : <EventsTable />}</div>;
};

export default Home;

// export async function getStaticProps({ locale }: any) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale || 'en', ['common', 'hashdox'])),
//     },
//   };
// }
