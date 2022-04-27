import type { NextPage } from 'next';
import { mockEvidences } from '../../mockData/mockEvidences';
import DashboardTable from '../../features/dashboardTable';

const getEvidences = (from: number, limit: number) => {
  if (from >= mockEvidences.length || limit < 0) return [];
  let to = from + limit; 
  if (to > mockEvidences.length) to = mockEvidences.length; 
  return mockEvidences.slice(from, to);
}

const DashboardPage: NextPage = () => {
  const from = 0;
  const to = 20;
  return <DashboardTable evidences={getEvidences(from, to)} from={from}/>;
};

export default DashboardPage;
