import type { NextPage } from 'next';
import EventsTable from '../components/eventsTable';
import NewEventForm from '../components/newEventForm';
import { useAppSelector } from '../hooks';

const Home: NextPage = () => {
  const { is_active } = useAppSelector((state) => state.eventReducer);
  return !is_active ? <NewEventForm /> : <EventsTable />;
};

export default Home;
