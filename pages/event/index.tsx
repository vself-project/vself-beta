import type { NextPage } from 'next';
import AppLayout from '../../components/appLayout';
import Header from '../../components/header';
import NewEventForm from '../../features/event-form';

const EventPage: NextPage = () => {
  return (
    <AppLayout>
      <>
        <Header />
        <div className="grid place-items-center h-screen">
          <NewEventForm />
        </div>
      </>
    </AppLayout>
  );
};

export default EventPage;
