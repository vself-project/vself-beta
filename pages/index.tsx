/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Header from '../components/header';
import Loader from '../components/loader';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setAppLoadingState } from '../store/reducers/appStateReducer/actions';
import { setOngoingEvents } from '../store/reducers/eventReducer/actions';
import { formatTimeStampToLocaleDateString } from '../utils';
import { getConnectedContract } from '../utils/contract';
import { mainContractMethods, mainContractName } from '../utils/contract-methods';

const Home: NextPage = () => {
  const router = useRouter();
  const { ongoingEvents, userOngoingEvents } = useAppSelector((state) => state.eventReducer);
  const { account_id } = useAppSelector((state) => state.userAccountReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getEventsStats = async (): Promise<void> => {
      const { contract } = await getConnectedContract(mainContractName, mainContractMethods);
      const events = await contract.get_ongoing_events({ from_index: 0, limit: 100 });
      const userEvents =
        account_id !== undefined ? await contract.get_ongoing_user_events({ account_id: String(account_id) }) : null;
      setTimeout(() => {
        dispatch(setOngoingEvents({ ongoingEvents: events, userOngoingEvents: userEvents }));
        dispatch(setAppLoadingState(false));
      }, 1000);
    };
    getEventsStats();
  }, [dispatch, account_id]);

  const navigateToEvent = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(setAppLoadingState(true));
    router.push('/event/' + e.currentTarget.id);
  };

  const navigateToNewEventForm = () => {
    dispatch(setAppLoadingState(true));
    router.push('/add');
  };
  return (
    <Loader>
      <>
        <Header />
        <div className="grid place-items-center min-h-screen">
          <div>
            <div className="block p-6 pb-10 rounded-lg shadow-lg bg-white  mb-4 text-black overflow-x-auto overflow-y-auto">
              <h2 className="mt-0 mb-4">Ongoing Events</h2>
              <table className=" border border-slate-500">
                <thead className="border-b bg-gray-800">
                  <tr>
                    <th className=" text-sm font-medium text-white px-4 py-2">Event Title</th>
                    <th className=" text-sm font-medium text-white px-4 py-2">Quests</th>
                    <th className=" text-sm font-medium text-white px-4 py-2">Users</th>
                    <th className=" text-sm font-medium text-white px-4 py-2">Start Time</th>
                    <th className=" text-sm font-medium text-white px-4 py-2">End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {ongoingEvents.map((event: any, index: number) => (
                    <tr
                      key={index}
                      id={event[0]}
                      onClick={navigateToEvent}
                      className="cursor-pointer hover:bg-slate-300 transition-colors ease-in border-b"
                    >
                      <td className="px-4 py-2">{event[1].event_name}</td>
                      <td className="px-4 py-2 text-center">{event[1].quests.length}</td>
                      <td className="px-4 py-2 text-center">{event[2].total_users}</td>
                      <td className="px-4 py-2">{formatTimeStampToLocaleDateString(event[1].start_time)}</td>
                      <td className="px-4 py-2">{formatTimeStampToLocaleDateString(event[1].finish_time)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {userOngoingEvents ? (
              <div className="block p-6 pb-10 rounded-lg shadow-lg bg-white  mb-4 text-black overflow-x-auto overflow-y-auto">
                <h2 className="mt-0 mb-4">Ongoing Events</h2>
                <table className=" border border-slate-500">
                  <thead className="border-b bg-gray-800">
                    <tr>
                      <th className=" text-sm font-medium text-white px-4 py-2">Event Title</th>
                      <th className=" text-sm font-medium text-white px-4 py-2">Quests</th>
                      <th className=" text-sm font-medium text-white px-4 py-2">Users</th>
                      <th className=" text-sm font-medium text-white px-4 py-2">Start Time</th>
                      <th className=" text-sm font-medium text-white px-4 py-2">End Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userOngoingEvents.map((event: any, index: number) => (
                      <tr
                        key={index}
                        id={event[0]}
                        onClick={navigateToEvent}
                        className="cursor-pointer hover:bg-slate-300 transition-colors ease-in border-b"
                      >
                        {/* <td className="px-4 py-2">{event[1].event_name}</td>
                      <td className="px-4 py-2 text-center">{event[1].quests.length}</td>
                      <td className="px-4 py-2 text-center">{event[2].total_users}</td>
                      <td className="px-4 py-2">{formatTimeStampToLocaleDateString(event[1].start_time)}</td>
                      <td className="px-4 py-2">{formatTimeStampToLocaleDateString(event[1].finish_time)}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center">
                <p>It seems, you don&apos;t have any ongoing events yet</p>
                <button
                  type="button"
                  className="inline-block px-6 py-2.5 bg-zinc-300 text-black hover:text-zinc-300 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-zinc-600 hover:shadow-lg focus:bg-zinc-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={navigateToNewEventForm}
                >
                  Add New Event
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    </Loader>
  );
};

export default Home;
