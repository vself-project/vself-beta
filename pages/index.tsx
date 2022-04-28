import type { NextPage } from 'next';
// import EventsTable from '../features/eventsTable';
// import NewEventForm from '../features/newEventForm';
// import { useAppSelector } from '../hooks';

const Home: NextPage = () => {
  // const { is_active } = useAppSelector((state) => state.eventReducer);
  // return !is_active ? <NewEventForm /> : <EventsTable />;
  return <h1>Welcome to PoW project powered by NEAR and Hashd0x!</h1>;
};

export default Home;
