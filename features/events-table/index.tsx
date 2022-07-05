import React, { useEffect } from 'react';
import { SpinnerLoader } from '../../components/loader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setEvent } from '../../store/reducers/eventReducer/actions';
import { getNearAccountAndContract } from '../../utils';
// Components
import EventActionsTable from './eventAcionsTable';
import EventCard from './eventCard';
import EventStatsTable from './eventStatsTable';

const EventsTable: React.FC = () => {
  const { account_id } = useAppSelector((state) => state.userAccountReducer);
  const { event_stats, event_data, event_actions } = useAppSelector((state) => state.eventReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getEventsStats = async (): Promise<void> => {
      const { contract } = await getNearAccountAndContract();
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
  }, [account_id, dispatch]);

  if (!event_data) return <SpinnerLoader />;

  return (
    <div className="flex-row flex flex-wrap container">
      <div className="flex-1 xl:w-1/5 sm:my-4 relative">
        {event_data !== undefined && <EventCard eventData={event_data} />}
      </div>

      <div className="flex-1 xl:ml-4 xl:w-3/5 sm:my-4">
        <div className="block p-6 rounded-lg shadow-lg bg-white  mb-4 overflow-x-auto">
          <EventStatsTable eventStats={event_stats} />
        </div>
        <div
          className="block p-6 rounded-lg shadow-lg bg-white  mb-4 w-full overflow-x-auto overflow-y-auto"
          style={{ maxHeight: 350, minHeight: 350 }}
        >
          <EventActionsTable eventActions={event_actions.slice(0).reverse()} eventData={event_data} />
        </div>
      </div>
    </div>
  );
};

export default EventsTable;
