/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { EventAction, EventData } from '../../models/Event';
import { formatTimeStampToLocaleDateString, formatTimeStampToLocaleTimeString } from '../../utils';

interface EventActionsTableProps {
  eventActions: EventAction[];
  eventData: EventData | undefined;
}

const EventActionsTable: React.FC<EventActionsTableProps> = ({ eventActions, eventData }) => {
  return (
    <table className="min-w-full text-center">
      <thead className="border-b bg-gray-800">
        <tr>
          <th className="text-sm font-medium text-white px-6 py-4">User</th>
          <th className="text-sm font-medium text-white px-6 py-4">QR</th>
          <th className="text-sm font-medium text-white px-6 py-4">Date</th>
          <th className="text-sm font-medium text-white px-6 py-4">Reward</th>
        </tr>
      </thead>
      <tbody>
        {eventActions.map(({ username, qr_string, timestamp, reward_index }, index) => (
          <tr key={index} className="bg-white border-b hover:bg-gray-100 cursor-pointer">
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{username}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{qr_string}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {formatTimeStampToLocaleDateString(timestamp) + ' ' + formatTimeStampToLocaleTimeString(timestamp)}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
              {eventData?.quests[reward_index] ? (
                <img src={`${eventData?.quests[reward_index].reward_uri}`} alt="reward" width={50} height={50} />
              ) : (
                <div style={{ width: 50, height: 50 }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventActionsTable;
