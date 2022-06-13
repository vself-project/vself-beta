import React from 'react';
import { EventStats } from '../../models/Event';
import { formatTimeStampToLocaleDateString } from '../../utils';

interface EventStatsTableProps {
  eventStats: EventStats | undefined;
}

const EventStatsTable: React.FC<EventStatsTableProps> = ({ eventStats }) => {
  return (
    <table className="min-w-full">
      <thead className="bg-white border-b">
        <tr>
          <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Start Date</th>
          <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">End Date</th>
          <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Total Actions</th>
          <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Total Rewards</th>
          <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Total Users</th>
        </tr>
      </thead>
      {eventStats && (
        <tbody>
          <tr className="bg-gray-100 border-b">
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {eventStats.start_time && formatTimeStampToLocaleDateString(eventStats.start_time)}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {eventStats.finish_time && formatTimeStampToLocaleDateString(eventStats.finish_time)}
            </td>

            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{eventStats.total_actions}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{eventStats.total_rewards}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{eventStats.total_users}</td>
          </tr>
          <tr className="bg-gray-100 border-b">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <b>Participants:</b>
            </td>
            <td className="break-words text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {eventStats.participants && eventStats.participants.join(', ')}
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
};

export default EventStatsTable;
