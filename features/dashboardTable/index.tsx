/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

// Components
import Spinner from '../../components/spinner';
import HashDoxLogo from '../../components/icons/HashDoxLogo';
import { Evidence } from '../../models/Evidence';
import URLImageComponent from '../../components/urlImage';

interface ImageLocation {
  latitude: number;
  longitude: number;
}

interface DashboardTableProps {
  evidences: Evidence[],
  from: number
}

// Constants
const TRX_HASH_EXAMPLE = '2mtMSbfb26ojrn8ZPRwodExQDWkM4qw2wGDhPQrnSATj';

// Return human readable string with date and time
const getDateFromTimestamp = (timestamp: any) => {
  const date = new Date(timestamp);
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

// Return url of image
const getImageSource = (evidence: Evidence) => {
  const { metadata, media_hash } = evidence;
  const metadataObject = JSON.parse(metadata);
  if (metadataObject.hasOwnProperty('uploadThrough') && metadataObject.uploadThrough == 'server') {
    // Images uploaded by mobile app
    return "http://82.148.29.178/images/" + media_hash + ".png";
  }
  // Get url of image storaged in firebase (uploaded through firebase) 
  return "https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2F" + media_hash + ".png?alt=media";
}

// TO DO remove 'from' prop
const DashboardTable: React.FC<DashboardTableProps> = ({ evidences, from }) => {
  const [activeEvidenceIndex, setActiveEvidenceIndex] = useState(0);

  // TO DO check that case
  if (!evidences.length) {
    return (
      <div className="grid place-items-center h-screen">
        <div className="text-center">
          <h2 className="mb-4">Uploading your photo</h2>
          <Spinner />
          <h3 className="mt-4">Please wait</h3>
        </div>
      </div>
    );
  }

  // Return block with transactions data
  const getTransactionsBlock = () => {
    return (
      <div className="flex flex-1 flex-col">
        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black', justifyContent: 'space-between', width: '100%', padding: '0px 12px 0px 12px' }}>
          <HashDoxLogo/>
          <p className="font-rational text-[10px] w-64 text-white mt-3">
            Hashd0x is a platform and a tool for instant and spoof-proof registration of metadata and image hashing
            records in Near Protocol and Ethereum Swarm blockchains.
          </p>
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 12 }}>
          <p className="font-rational text-white text-[12px]">
            TRANSACTIONS
          </p>
          <div className="flex justify-center">
            <ul className="rounded-lg w-full font-rational text-white text-[12px] overflow-y-scroll h-[160px] no-scrollbar pl-0">
              {evidences.map((evidence, index) => {
                return (
                  <li key={index} onClick={() => setActiveEvidenceIndex(index)} className={`py-2 w-full rounded-t-lg cursor-pointer ${index === activeEvidenceIndex && 'font-bold'}`}>
                    {TRX_HASH_EXAMPLE} at {getDateFromTimestamp(Math.floor(Date.now() / 1000))}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  // Return block with corresponding image
  const getImageBlock = () => {
    const image_url = getImageSource(evidences[activeEvidenceIndex]);
    return (
      <div className="p-2 flex flex-1 justify-center align-center sm:justify-start"> 
        <URLImageComponent url={image_url} className="h-80 rounded max-w-sm"/>
      </div>
    )
  }

  const getMapBlock = () => {
    return (
      <div className="h-64 bg-stone-500">Map</div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh' }}>
      <div className="flex flex-1 flex-col sm:flex-row">
        {getTransactionsBlock()}
        {getImageBlock()}
      </div>
      <div className="flex flex-1 flex-col sm:flex-row">
        <div style={{ display: 'flex:', flex: 1, backgroundColor: 'yellow' }}>
          {getTransactionsBlock()}
        </div>
        <div style={{ display: 'flex', flex: 1, backgroundColor: 'green' }}>
          {getTransactionsBlock()}
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
