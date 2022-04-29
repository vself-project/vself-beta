/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
// import { mockEvidences } from '../../mockData/mockEvidences';
import { getDateFromTimestamp, TRX_HASH_EXAMPLE } from '../../features/dashboardTable';
import { getPOWAccountAndContract } from '../../utils';
import { mockUserAccount } from '../../mockData/mockUserAccount';
import HashDoxLogo from '../../components/icons/HashDoxLogo';

// const getEvidences = (from: number, limit: number) => {
//   if (from >= mockEvidences.length || limit < 0) return [];
//   let to = from + limit;
//   if (to > mockEvidences.length) to = mockEvidences.length;
//   return mockEvidences.slice(from, to);
// };

const ExplorerPage: NextPage = () => {
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

  return (
    <div className="flex flex-1 flex-col items-center mt-4">
      <div style={{ maxWidth: 1200 }}>
        <div className="flex flex-row w-full justify-between">
          <HashDoxLogo />
          <p className="font-rational text-[12px] w-64 text-white mt-3">
            Hashd0x is a platform and a tool for instant and spoof-proof registration of metadata and image hashing
            records in Near Protocol and Ethereum Swarm blockchains.
          </p>
          <div className="flex justify-between">
            <img src="/applenew.png" alt="AppStore" width={200} style={{ marginRight: 5, borderRadius: 6 }} />
            <img src="/google.png" alt="Google Play" width={200} style={{ borderRadius: 6 }} />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* <p className="font-rational text-white text-[12px] mb-2">TRANSACTIONS</p> */}
          <p className="font-rational text-white text-[14px] mb-2">FILEHASHES</p>
          <ul className="font-rational text-white text-[12px] overflow-y-scroll no-scrollbar pl-0">
            {evidences.map((evidence: any, index) => {
              return (
                <li key={index} className="py-2 w-full cursor-pointer text-[10px] text-white">
                  {TRX_HASH_EXAMPLE} at {getDateFromTimestamp(Math.floor(Date.now()))}
                  {evidence.media_hash}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExplorerPage;
