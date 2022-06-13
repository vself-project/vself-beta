/* eslint-disable no-prototype-builtins */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
// import Link from 'next/link';

// Components
import { Evidence } from '../../models/Evidence';
import { powAccount } from '../../constants/accounts';
import HashDoxLogo from '../../components/icons/HashDoxLogo';
import HashDoxIcon from '../../components/icons/HashDoxIcon';
import URLImageComponent from '../../components/urlImage';
import MapComponent from '../../components/mapcomponent';

import { txHashes } from '../../mockData/mockEvidences';

interface DashboardTableProps {
  evidences: Evidence[];
}

// Constants
export const TRX_HASH_EXAMPLE = '2mtMSbfb26ojrn8ZPRwodExQDWkM4qw2wGDhPQrnSATj';
const LOCATION_DEFAULT = {
  lat: 47.662465,
  lng: -25.367988,
};
const LOCATION_PRELOADED = {
  lat: 49.887742,
  lng: 30.977597,
};

// Return human readable string with date and time
export const getDateFromTimestamp = (timestamp: any) => {
  const date = new Date(timestamp);
  return (
    date.getDate() +
    '/' +
    (date.getMonth() + 1) +
    '/' +
    date.getFullYear() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds()
  );
};

// Return url of image
const getImageSource = (evidence: Evidence) => {
  try {
    const { metadata, media_hash } = evidence;
    if (metadata === 'preloaded') {
      //return '/pow/' + media_hash + '.png';
      //https://console.firebase.google.com/project/hashdox/storage/hashdox.appspot.com/files/~2Fpreloaded
      return (
        'https://firebasestorage.googleapis.com/v0/b/hashdox.appspot.com/o/preloaded%2F' + media_hash + '.png?alt=media'
      );
    }
    const metadataObject = JSON.parse(metadata);
    if (metadataObject.hasOwnProperty('uploadThrough') && metadataObject.uploadThrough == 'server') {
      // Images uploaded by mobile app
      return 'https://82.148.29.178/images/' + media_hash + '.png';
    }
    // Get url of image storaged in firebase (uploaded through firebase)
    return (
      'https://firebasestorage.googleapis.com/v0/b/hashdox.appspot.com/o/images%2F' + media_hash + '.png?alt=media'
    );
  } catch (err) {
    console.log(err);
    return '';
  }
};

// Return cut hash if it's too long
export const cutHash = (hash: string, limit: number) => {
  if (hash.length > limit) {
    return hash.slice(0, limit - 3) + '...';
  }
  return hash;
};

// TO DO remove 'from' prop
const DashboardTable: React.FC<DashboardTableProps> = ({ evidences }) => {
  const [activeEvidenceIndex, setActiveEvidenceIndex] = useState(0);
  const counter = useRef(0);

  useEffect(() => {
    let newIndex = 0;
    const activeLi = document.getElementById('activeEvidenceIndex');
    if (activeEvidenceIndex < evidences.length - 1) {
      counter.current += 1;
      newIndex = activeEvidenceIndex + 1;
    }
    activeLi &&
      activeLi.scrollIntoView({
        behavior: 'smooth',
      });

    const timer = setTimeout(() => setActiveEvidenceIndex(newIndex), 15000);

    return () => clearTimeout(timer);
  }, [activeEvidenceIndex, evidences.length]);

  // Empty evidence array case
  if (!evidences.length) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
        }}
      >
        <div className="animate-spin-slow">
          <HashDoxIcon />
        </div>
      </div>
    );
  }

  // Return block with transactions data
  const getTransactionsBlock = () => {
    return (
      <div className="flex flex-1 flex-col" style={{ minWidth: '50%' }}>
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
              const explorerUriPrefix = 'https://explorer.testnet.near.org/transactions/';
              return (
                <li
                  key={index}
                  id={index === activeEvidenceIndex ? 'activeEvidenceIndex' : ''}
                  onClick={() => setActiveEvidenceIndex(index)}
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
      </div>
    );
  };

  // Return block with corresponding image
  const getImageBlock = () => {
    const image_url = getImageSource(evidences[activeEvidenceIndex]);
    return (
      <div className="flex flex-1 justify-center align-center" style={{ minWidth: '50%' }}>
        <URLImageComponent url={image_url} className="mx-4 rounded self-center max-h-[400px]" />
      </div>
    );
  };

  // Return map component with marker or not
  const getMapComponent = () => {
    try {
      let { lat, lng } = LOCATION_PRELOADED;
      let zoom = 6;
      let marker = false;
      const { metadata } = evidences[activeEvidenceIndex];
      if (metadata !== 'preloaded') {
        const metadataObject = JSON.parse(metadata);
        let { location } = metadataObject;
        if (location == 'unknown' || location === undefined) {
          throw Error('Location is unknown or undefined');
        }

        // Check how evidence had been uploaded
        if (metadataObject.hasOwnProperty('uploadThrough') && metadataObject.uploadThrough == 'server') {
          location = location.split(' ');
          lat = Number(location[0].slice(0, -1));
          lng = Number(location[1].slice(0, -1));
        } else {
          // TO DO check location from evidence uploaded through web app (JSON.parse error in mock data)
          lat = Number(location.latitude);
          lng = Number(location.longitude);
        }
        zoom = 11;
        marker = true;
      }
      return <MapComponent height={'100%'} center={{ lat, lng }} zoom={zoom} marker={marker} />;
    } catch (err) {
      return (
        <MapComponent height={'100%'} center={{ lat: LOCATION_DEFAULT.lat, lng: LOCATION_DEFAULT.lng }} zoom={2} />
      );
    }
  };

  // Return block with map
  const getMapBlock = () => {
    return (
      <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minWidth: '50%' }}>
        <div className="self-center h-full">{getMapComponent()}</div>
      </div>
    );
  };

  // Return block with map
  const getEvidenceDataBlock = () => {
    try {
      const evidence = evidences[activeEvidenceIndex];
      const { metadata, media_hash } = evidence;
      let signedBy = powAccount;
      let location: any = 'Ukraine';
      if (metadata !== 'preloaded') {
        const metadataObject = JSON.parse(metadata);
        if (!metadataObject.hasOwnProperty('uploadThrough') || metadataObject.uploadThrough != 'server') {
          signedBy = metadataObject.name;
          if (signedBy === undefined) {
            signedBy = 'Unknown';
          }
        }

        location = metadataObject.location;
        if (location == undefined) {
          location = 'Unknown';
        } else if (!metadataObject.hasOwnProperty('uploadThrough') || metadataObject.uploadThrough != 'server') {
          const { lat, lng } = location;
          if (lat != undefined && lng != undefined) {
            location = String(location.lat) + 'N  ' + location.lng + 'E';
          }
        }
      }

      return (
        <div className="flex flex-1 justify-center pb-[40px]" style={{ minWidth: '50%' }}>
          <div className="flex flex-col justify-center p-[8px]">
            <div className="flex flex-row justify-between mb-[10px]">
              <div>
                <p className="font-rational text-white text-[12px]">SIGNED</p>
                <p className="font-rational text-white text-[10px]">{signedBy}</p>
              </div>
              <div>
                <p className="font-rational pl-4 text-white text-[12px]">TIMESTAMP</p>
                <p className="font-rational pl-4 text-white text-[10px]">
                  {getDateFromTimestamp(Math.floor(Date.now() / 1000))}
                  {txHashes[evidence.media_hash].time ?? getDateFromTimestamp(Math.floor(Date.now() / 1000))}
                  {/* Unknown */}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-rational text-white text-[14px]">FILEHASH</p>
              <p className="font-rational text-white text-[10px] self-end">Powered by Swarm</p>
            </div>
            <p className="p-1 pb-0 font-rational text-white text-[14px] border w-full">{cutHash(media_hash, 40)}</p>
            <div className="flex flex-row justify-between mt-2">
              <p className="font-rational text-white text-[14px]">HASHMARK</p>
              <p className="font-rational text-white text-[10px] self-end">Powered by NEAR</p>
            </div>
            <p className="p-1 pb-0 font-rational text-white text-[14px] border w-full h-[25px]">
              {cutHash(txHashes[evidence.media_hash].tx ?? TRX_HASH_EXAMPLE, 40)}
            </p>
            <div className="flex flex-row justify-between w-full mt-3">
              <div>
                <p className="font-rational text-white text-[14px]">LOCATION DATA</p>
                <p className="font-rational text-white text-[12px]  break-all">{JSON.stringify(location)}</p>
              </div>
              <p className="ml-4 font-rational text-white text-[10px] w-44">
                Location data can be spoofed or faked at several levels of the operating system, GPS or VPN
              </p>
            </div>
          </div>
        </div>
      );
    } catch (err) {
      const { media_hash } = evidences[activeEvidenceIndex];
      return (
        <div className="flex flex-1 justify-center pb-[40px]" style={{ minWidth: '50%' }}>
          <div className="flex flex-col justify-center p-[8px]">
            <div className="flex flex-row justify-between mb-[10px]">
              <div>
                <p className="font-rational text-white text-[12px]">SIGNED</p>
                <p className="font-rational text-white text-[10px]">Unknown</p>
              </div>
              <div>
                <p className="font-rational text-white text-[12px]">TIMESTAMP</p>
                <p className="font-rational text-white text-[10px]">Unknown</p>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <p className="font-rational text-white text-[14px]">FILEHASH</p>
              <p className="font-rational text-white text-[10px] self-end">Powered by Swarm</p>
            </div>
            <p className="p-1 pb-0 font-rational text-white text-[14px] border w-full">{cutHash(media_hash, 40)}</p>
            <div className="flex flex-row justify-between mt-2">
              <p className="font-rational text-white text-[14px]">HASHMARK</p>
              <p className="font-rational text-white text-[10px] self-end">Powered by NEAR</p>
            </div>
            <p className="p-1 pb-0 font-rational text-white text-[14px] border w-full h-[25px]"></p>
            <div className="flex flex-row justify-between w-full mt-3 break-words">
              <div>
                <p className="font-rational text-white text-[14px]">LOCATION DATA</p>
                <p className="font-rational text-white text-[12px] break-all">{JSON.stringify(location)}</p>
              </div>
              <p className="ml-4 font-rational text-white text-[10px] w-44">
                Location data can be spoofed or faked at several levels of the operating system, GPS or VPN
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-1 flex-col sm:flex-row">
        {getTransactionsBlock()}
        {getImageBlock()}
      </div>
      <div className="flex flex-1 flex-col sm:flex-row">
        {/* {getMapBlock()} */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            minWidth: '50%',
          }}
        >
          <div className="animate-spin-slow">
            <HashDoxIcon />
          </div>
        </div>
        {getEvidenceDataBlock()}
      </div>
    </div>
  );
};

export default DashboardTable;
