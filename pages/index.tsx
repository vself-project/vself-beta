import type { NextPage } from 'next';
// import EventsTable from '../features/eventsTable';
// import NewEventForm from '../features/newEventForm';
// import { useAppSelector } from '../hooks';

const Home: NextPage = () => {
  // const { is_active } = useAppSelector((state) => state.eventReducer);
  // return !is_active ? <NewEventForm /> : <EventsTable />;
  return (
    <div className="grid place-items-center h-screen">
      <div className="" style={{ maxWidth: 600 }}>
        <p className="font-rational bottom-0">
          Hashd0x is a platform and a tool for instant and spoof-proof registration of metadata and image hashing
          records in Near Protocol and Ethereum Swarm blockchains.
        </p>
      </div>
    </div>
  );
};

export default Home;
