import type { NextPage } from 'next';
import { mockEvidences } from '../../mockData/mockEvidences';
import DashboardTable from '../../features/dashboardTable';

const DashboardPage: NextPage = () => {
  return <DashboardTable evidences={mockEvidences} />;
};

export default DashboardPage;
