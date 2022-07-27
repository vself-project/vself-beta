import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Header from '../../components/header';
import Loader from '../../components/loader';
import EventsTable from '../../features/events-table';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setAppLoadingState } from '../../store/reducers/appStateReducer/actions';
import { setActiveEvent } from '../../store/reducers/eventReducer/actions';
import { getConnectedContract } from '../../utils/contract';
import { mainContractMethods, mainContractName } from '../../utils/contract-methods';

const EventPage: NextPage = () => {
  const { event_stats, event_data, event_actions } = useAppSelector((state) => state.eventReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { event_id } = router.query;

  useEffect(() => {
    const getEventsStats = async (): Promise<void> => {
      const { contract } = await getConnectedContract(mainContractName, mainContractMethods);
      const actions = await contract.get_event_actions({ event_id: Number(event_id), from_index: 0, limit: 100 });
      const stats = await contract.get_event_stats({ event_id: Number(event_id) });
      const data = await contract.get_event_data({ event_id: Number(event_id) });
      setTimeout(() => {
        dispatch(
          setActiveEvent({
            event_data: data,
            event_stats: stats,
            event_actions: actions,
          })
        );
        dispatch(setAppLoadingState(false));
      }, 1000);
    };
    getEventsStats();
  }, [dispatch, event_id]);
  return (
    <Loader>
      <>
        <Header />
        <div className="grid place-items-center min-h-screen">
          <EventsTable event_stats={event_stats} event_data={event_data} event_actions={event_actions} />
        </div>
      </>
    </Loader>
  );
};

export default EventPage;
