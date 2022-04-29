import type { NextPage } from 'next';
// import { mockEvidences } from '../../mockData/mockEvidences';
import DashboardTable from '../../features/dashboardTable';
import { useEffect, useState } from 'react';
import { getPOWAccountAndContract } from '../../utils';
import { mockUserAccount } from '../../mockData/mockUserAccount';

const DashboardPage: NextPage = () => {
  const [evidences, setEvidences] = useState([]);
  useEffect(() => {
    const getEvidences = async (from: number, limit: number) => {
      const { contract } = await getPOWAccountAndContract(mockUserAccount.account_id);
      const response = await contract.get_evidences({
        from_index: from,
        limit,
      });
      console.log('response: ', response);
      setEvidences(response);
    };
    getEvidences(395, 410);
  }, []);
  return <DashboardTable evidences={evidences} />;
};

export default DashboardPage;
