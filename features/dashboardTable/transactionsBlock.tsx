import React from 'react';

const TransactionsBlock: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-row bg-black justify-between w-full pt-3 px-4">
        {/* <HashDoxLogo /> */}
        <p className="font-rational text-[12px] w-64 text-white mt-3">
          Hashd0x is a platform and a tool for instant and spoof-proof registration of metadata and image hashing
          records in Near Protocol and Ethereum Swarm blockchains.
        </p>
      </div>
      <div className="flex flex-1 flex-col">
        <p className="font-rational text-white text-[14px] p-4">TRANSACTIONS</p>
        <ul className="font-rational text-white text-[12px] overflow-y-scroll h-[280px] no-scrollbar p-4"></ul>
      </div>
    </div>
  );
};

export default TransactionsBlock;
