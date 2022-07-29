/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { EventData } from '../../models/Event';
import { formatTimeStampToLocaleDateString } from '../../utils';
import StartEventButton from '../../components/startEventButton';
import { useAppSelector } from '../../hooks';

interface EventConfirmProps {
  eventData: EventData | undefined;
  files?: File[];
}

const EventConfirm: React.FC<EventConfirmProps> = ({ eventData, files }) => {
  const { is_authed } = useAppSelector((state) => state.appStateReducer);
  return (
    <div className="flex flex-col relative overflow-auto" style={{ maxHeight: '80vh' }}>
      <div className="flex justify-center flex-col rounded-lg shadow-lg text-black bg-white">
        <div className="flex-row flex my-2 p-4 self-center">
          <img className="w-1/5 rounded-t-lg" src="/vvs.png" alt="" />
          <div className="w-2/5 ml-4">
            <h5 className="text-gray-900 text-xl font-medium mb-2">{eventData?.event_name}</h5>
            <p className="text-gray-700 text-base mb-4">{eventData?.event_description}</p>
            <p className="text-gray-700 text-base mb-4">
              Start Time: {eventData?.start_time && formatTimeStampToLocaleDateString(eventData.start_time)}
            </p>
            <p className="text-gray-700 text-base mb-4">
              Finish Time: {eventData?.finish_time && formatTimeStampToLocaleDateString(eventData.finish_time)}
            </p>
          </div>
        </div>
        {is_authed && (
          <div className="flex border-t-2 py-5 mt-[auto] pr-5 justify-end">
            <StartEventButton />{' '}
          </div>
        )}
      </div>

      <div className="flex w-full flex-row flex-wrap">
        {eventData?.quests.map((quest, index) => (
          <div key={index} className="flex w-1/4 mt-2 px-1">
            <div className="flex flex-col w-full rounded-lg shadow-lg text-black bg-white p-4  hover:bg-gray-200 cursor-pointer">
              <h3 className="font-bold">Quest #{index + 1}</h3>
              <div
                style={{
                  width: '100%',
                  height: 300,
                  maxHeight: 300,
                  backgroundImage:
                    files !== undefined && files.length > 0 && files[index] !== undefined
                      ? `url(${URL.createObjectURL(files[index])})`
                      : 'none',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventConfirm;
