import React, { useEffect, useRef, useState } from 'react';
import { getDateFromTimestamp, TRX_HASH_EXAMPLE } from '.';
import HashDoxLogo from '../../components/icons/HashDoxLogo';
import { txHashes } from '../../mockData/mockEvidences';

interface TransactionsBlockProps {
  evidences: any[];
  activeEvidenceIndex: number;
  callback: (index: number) => void;
}

const TransactionsBlock: React.FC<TransactionsBlockProps> = ({ evidences, activeEvidenceIndex, callback }) => {
  return (
    <>
      <div className="flex flex-row bg-black justify-between w-full pt-3 px-4">
        <HashDoxLogo />
        <p className="font-rational text-[10px] w-64 text-white mt-3">
          Hashd0x is a platform and a tool for instant and spoof-proof registration of metadata and image hashing
          records in Near Protocol and Ethereum Swarm blockchains.
        </p>
      </div>
      <div className="flex flex-1 flex-col">
        <p className="font-rational text-white text-[14px] p-4">TRANSACTIONS</p>
        <ul className="font-rational text-white text-[10px] overflow-y-scroll h-[280px] no-scrollbar p-4">
          {evidences.map((evidence, index) => {
            // const explorerUriPrefix = 'https://explorer.testnet.near.org/transactions/';
            const setActiveEvidenceIndex = () => {
              callback(index);
            };
            return (
              <li
                key={index}
                id={index === activeEvidenceIndex ? 'activeEvidenceIndex' : ''}
                onClick={setActiveEvidenceIndex}
                className={`py-2 w-full cursor-pointer text-[10px] ${
                  index === activeEvidenceIndex ? 'text-white' : 'text-gray-400'
                }`}
              >
                <p>
                  {txHashes[evidence.media_hash]?.tx ?? TRX_HASH_EXAMPLE} at{' '}
                  {txHashes[evidence.media_hash]?.time ?? getDateFromTimestamp(Math.floor(Date.now()))}
                </p>
                <p>
                  {/* {evidence.media_hash}
                    <Link href={explorerUriPrefix + (txHashes[evidence.media_hash]?.tx || '')}>
                      <a target="_blank" className="hover:text-gray-600 underline underline-offset-2 cursor-pointer">
                        {evidence.media_hash}
                      </a>
                    </Link> */}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default TransactionsBlock;
