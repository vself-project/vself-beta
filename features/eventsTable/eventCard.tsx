/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { EventData } from '../../models/Event';
import { formatTimeStampToLocaleDateString } from '../../utils';
import StartEventButton from '../../components/startEventButton';

interface EventCardProps {
  eventData: EventData | undefined;
  detailed?: boolean;
  files?: File[];
}

const EventCard: React.FC<EventCardProps> = ({ eventData, detailed, files }) => {
  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-sm relative" style={{ minHeight: 600 }}>
        <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
          <img className="rounded-t-lg" src="/meta.jpg" alt="" />
        </a>
        <div className="p-6 mb-10">
          <h5 className="text-gray-900 text-xl font-medium mb-2">{eventData?.event_name}</h5>
          {detailed &&
            eventData?.quests.map((quest, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg shadow-lg bg-white mb-2 p-10 hover:bg-gray-200 cursor-pointer"
              >
                <h3 className="font-bold">Quest #{index + 1}</h3>
                {files !== undefined && files?.length > 0 && (
                  <img className="rounded mb-4" src={URL.createObjectURL(files[index])} alt="" />
                )}
                <span className="mb-2">
                  <b>reward_title:</b> {quest.reward_title}
                </span>
                <span className="mb-2">
                  <b>reward_description:</b> {quest.reward_description}
                </span>
                <span className="mb-2">
                  <b>qr_prefix:</b> {quest.qr_prefix_enc}
                </span>
              </div>
            ))}
          <p className="text-gray-700 text-base mb-4">{eventData?.event_description}</p>
          <p className="text-gray-700 text-base mb-4">
            Start Time: {eventData?.start_time && formatTimeStampToLocaleDateString(eventData.start_time)}
          </p>
          <p className="text-gray-700 text-base mb-4">
            Finish Time: {eventData?.finish_time && formatTimeStampToLocaleDateString(eventData.finish_time)}
          </p>
        </div>
        <div className="absolute bottom-6 left-6">
          <StartEventButton />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
