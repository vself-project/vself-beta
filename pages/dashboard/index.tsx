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
  return <DashboardTable evidences={getEvidences(10,30)} />;
};

export default DashboardPage;
