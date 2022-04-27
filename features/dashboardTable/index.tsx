/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { renderFirebaseImage } from '../../utils/firebase';

// Components
import Spinner from '../../components/spinner';
import HashDoxLogo from '../../components/icons/HashDoxLogo';
import { Evidence } from '../../models/Evidence';

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
const getDateFromTimestamp = (timestamp: any) => {
  const date = new Date(timestamp);
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
const getImageSource = (evidence: Evidence) => {
  const { metadata, media_hash } = evidence;
  const metadataObject = JSON.parse(metadata);
  if (metadataObject.hasOwnProperty('uploadThrough') && metadataObject.uploadThrough == 'server') {
    //return "https://mdbootstrap.com/img/new/standard/nature/184.jpg";
    const url = "http://82.148.29.178/images/" + media_hash + ".png";
    return url;
  }
  return "https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2F" + media_hash + ".png?alt=media";
  // Firebase image data
  // "https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2F" + media_hash + ".png"
}

// TO DO check that case
const DashboardTable: React.FC<DashboardTableProps> = ({ evidences, from }) => {
  const [activeEvidenceIndex, setActiveEvidenceIndex] = useState(0);
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
  console.log({ evidences });

  const getImageCard = () => {
    return (
      <div className="rounded-lg shadow-lg bg-white max-w-sm h-full">
        <a href="#!">
          <img className="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt="The image isn't available."/>
        </a>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">Data</h5>
          <p className="text-gray-700 text-base mb-4">
            Some quick example text to build on the card title and make up the bulk of the card's
            content.
          </p>
        </div>
      </div>
    )
  }

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

  const getMapBlock = () => {
    return (
      <div className="h-64 bg-stone-500">Map</div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh' }}>
      <div className="flex flex-1 flex-col sm:flex-row">
        {getTransactionsBlock()}
        <div style={{ display: 'flex', flex: 1, backgroundColor: 'brown' }}>
          <img className="" src={getImageSource(evidences[activeEvidenceIndex])} alt="The image isn't available."/>
        </div>
      </div>
      <div className="flex flex-1 flex-col sm:flex-row">
        <div style={{ display: 'flex:', flex: 1, backgroundColor: 'yellow' }}>
          3
        </div>
        <div style={{ display: 'flex', flex: 1, backgroundColor: 'green' }}>
          4
        </div>
      </div>
      {/* <div className="flex justify-center	bg-stone-100">
        <div className="flex flex-row columns-2 bg-stone-400">
          <div className="flex flex-col basis-1/2 bg-orange-400 max-w-2xl">
            <div className="block rounded-lg shadow-lg bg-white p-4 pr-10 mr-2 mb-2">
              {getDataTable()}
            </div>
            <div className="block rounded-lg shadow-lg bg-white p-4 mr-2">
             {getMapBlock()}
            </div>
          </div>
          <div className="basis-1/2">
          {getImageCard()}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardTable;
