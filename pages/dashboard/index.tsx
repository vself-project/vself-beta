import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
// import { mockEvidences } from '../../mockData/mockEvidences';
import DashboardTable from '../../features/dashboardTable';
import { getPOWAccountAndContract } from '../../utils';
import { mockUserAccount } from '../../mockData/mockUserAccount';

// const getEvidences = (from: number, limit: number) => {
//   if (from >= mockEvidences.length || limit < 0) return [];
//   let to = from + limit;
//   if (to > mockEvidences.length) to = mockEvidences.length;
//   return mockEvidences.slice(from, to);
// };

const DashboardPage: NextPage = () => {
  const [evidences, setEvidences] = useState([]);
  const _from = 0;
  const _limit = 1000;

  useEffect(() => {
    let timeOutID: any;
    const getEvidences = async (from: number, limit: number) => {
      try {
        const { contract } = await getPOWAccountAndContract(mockUserAccount.account_id);
        const response = await contract.get_evidences({
          from_index: from,
          limit,
        });
        console.log('response: ', response);
        setEvidences(response);
      } catch (err) {
        console.log(err);
      }
      timeOutID = setTimeout(() => {
        getEvidences(from, limit);
      }, 60000);
    };
    getEvidences(_from, _limit);

    return () => {
      clearTimeout(timeOutID);
    };
  }, []);

  return <DashboardTable evidences={evidences} />;
};

export default DashboardPage;
