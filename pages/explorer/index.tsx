/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { getDateFromTimestamp, TRX_HASH_EXAMPLE } from '../../features/dashboard';
import { getPOWAccountAndContract } from '../../utils';
import HashDoxLogo from '../../components/icons/HashDoxLogo';
import { txHashes } from '../../mockData/mockEvidences';
import Link from 'next/link';

const ExplorerPage: NextPage = () => {
  const [evidences, setEvidences] = useState([]);
  const _from = 0;
  const _limit = 1000;

  useEffect(() => {
    let timeOutID: any;
    const getEvidences = async (from: number, limit: number) => {
      try {
        const { contract } = await getPOWAccountAndContract();
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
    <div className="flex flex-1 flex-col items-center w-full p-5">
      <div className="flex flex-row w-full justify-between">
        <div>
          <HashDoxLogo />
          <p className="font-rational text-[14px] w-64 text-white mt-3">
            Hashd0x is a platform and a tool for instant and spoof-proof registration of metadata and image hashing
            records in Near Protocol and Ethereum Swarm blockchains.
          </p>
        </div>
        <div className="flex justify-between">
          <img src="/applenew.png" alt="AppStore" width={200} style={{ marginRight: 5, borderRadius: 6 }} />
          <img src="/google.png" alt="Google Play" width={200} style={{ borderRadius: 6 }} />
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col justify-center mt-8">
        <p className="font-rational text-white text-[20px] mb-2">TRANSACTIONS</p>
        {/* <p className="font-rational text-white text-[14px] mb-2">FILEHASHES</p> */}
        <ul className="font-rational text-white text-[16px] overflow-y-scroll no-scrollbar pl-0">
          {evidences.map((evidence: any, index) => {
            const explorerUriPrefix = 'https://explorer.testnet.near.org/transactions/';
            return (
              <li key={index} className="py-2 w-full cursor-pointer  text-white">
                <p>
                  {txHashes[evidence.media_hash]?.tx ?? TRX_HASH_EXAMPLE} at{' '}
                  {txHashes[evidence.media_hash]?.time ?? getDateFromTimestamp(Math.floor(Date.now()))}
                </p>
                <p>
                  <Link href={explorerUriPrefix + txHashes[evidence.media_hash]?.tx}>
                    <a target="_blank" className="hover:text-gray-600 underline underline-offset-2 cursor-pointer">
                      {evidence.media_hash}
                    </a>
                  </Link>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ExplorerPage;
