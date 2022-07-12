/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import { useEffect } from 'react';
import Header from '../components/header';
import EventsTable from '../features/events-table';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setEvent } from '../store/reducers/eventReducer/actions';
import { getConnectedContract } from '../utils/contract';
import { mainContractMethods, mainContractName } from '../utils/contract-methods';

const Home: NextPage = () => {
  // i18n method
  // const { t } = useTranslation(['hashdox', 'common']);
  const { event_stats, event_data, event_actions } = useAppSelector((state) => state.eventReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getEventsStats = async (): Promise<void> => {
      const { contract } = await getConnectedContract(mainContractName, mainContractMethods);
      const actions = await contract.get_actions({ from_index: 0, limit: 100 });
      const stats = await contract.get_event_stats();
      const data = await contract.get_event_data();
      setTimeout(() => {
        dispatch(
          setEvent({
            event_data: data,
            event_stats: stats,
            event_actions: actions,
          })
        );
      }, 1000);
    };
    getEventsStats();
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="grid place-items-center min-h-screen">
        <EventsTable event_stats={event_stats} event_data={event_data} event_actions={event_actions} />
      </div>
    </>
  );
};

export default Home;

// i18n Server Side Method

// export async function getStaticProps({ locale }: any) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale || 'en', ['common', 'hashdox'])),
//     },
//   };
// }

// i18n Server Side Method
