import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Header from '../../components/header';
import Loader, { SpinnerLoader } from '../../components/loader';
import EventActionsTable from '../../features/events-table/eventAcionsTable';
import EventCard from '../../features/events-table/eventCard';
import EventStatsTable from '../../features/events-table/eventStatsTable';
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

  if (!event_data) return <SpinnerLoader />;

  return (
    <Loader>
      <>
        <Header />
        <div className="grid place-items-center min-h-screen">
          <div className="flex-row flex flex-wrap container">
            <div className="flex-1 xl:w-1/5 sm:my-4">
              {event_data !== undefined && <EventCard eventData={event_data} />}
            </div>

            <div className="flex-1 xl:ml-4 xl:w-4/5 sm:my-4">
              <div className="block p-6 rounded-lg shadow-lg bg-white mb-4 overflow-x-auto">
                <EventStatsTable eventStats={event_stats} />
              </div>
              <div
                className="block p-6 rounded-lg shadow-lg bg-white mb-4 w-full overflow-x-auto overflow-y-auto"
                style={{ maxHeight: 350, minHeight: 350 }}
              >
                <EventActionsTable eventActions={event_actions.slice(0).reverse()} eventData={event_data} />
              </div>
            </div>
          </div>
        </div>
      </>
    </Loader>
  );
};

export default EventPage;
