/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Link from 'next/link';
// import EventsTable from '../features/eventsTable';
// import NewEventForm from '../features/newEventForm';
// import { useAppSelector } from '../hooks';

const Home: NextPage = () => {
  // const { is_active } = useAppSelector((state) => state.eventReducer);
  // return !is_active ? <NewEventForm /> : <EventsTable />;
  return (
    <div className="grid place-items-center h-screen">
      <div className="" style={{ maxWidth: 600 }}>
        <p className="font-rational text-white">
          Hashd0x is a platform and a tool for instant and spoof-proof registration of metadata and image hashing
          records in Near Protocol and Ethereum Swarm blockchains.
        </p>
        <p className="font-rational my-8 text-white">
          You can participate by downloading an app or visiting web version{' '}
          <Link href="/upload" passHref>
            <span className="hover:text-gray-600 underline underline-offset-2 cursor-pointer">upload</span>
          </Link>{' '}
          and see the results on the{' '}
          <Link href="/dashboard" passHref>
            <span className="hover:text-gray-600 underline underline-offset-2 cursor-pointer">dashboard</span>
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
