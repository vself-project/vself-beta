/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { EventData } from '../../models/Event';
import { formatTimeStampToLocaleDateString } from '../../utils';
import StartEventButton from '../../components/startEventButton';
import { useAppSelector } from '../../hooks';

interface EventCardProps {
  eventData: EventData | undefined;
}

const EventCard: React.FC<EventCardProps> = ({ eventData }) => {
  const { is_authed } = useAppSelector((state) => state.appStateReducer);
  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white relative overflow-auto" style={{ maxHeight: 550 }}>
        <div className="justify-center w-full flex mt-2">
          <img className="rounded-t-lg" src="/vvs.png" alt="" />
        </div>
        <div className="p-6 mb-10">
          <h5 className="text-gray-900 text-xl font-medium mb-2">{eventData?.event_name}</h5>

          <p className="text-gray-700 text-base mb-4">{eventData?.event_description}</p>
          <p className="text-gray-700 text-base mb-4">
            Start Time: {eventData?.start_time && formatTimeStampToLocaleDateString(eventData.start_time)}
          </p>
          <p className="text-gray-700 text-base mb-4">
            Finish Time: {eventData?.finish_time && formatTimeStampToLocaleDateString(eventData.finish_time)}
          </p>
        </div>
        {is_authed && (
          <div className="border-t-2 pt-5 mt-[auto] ">
            <StartEventButton />{' '}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
