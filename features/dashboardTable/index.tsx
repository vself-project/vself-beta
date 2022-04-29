/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Components
import { Evidence } from '../../models/Evidence';
import { powAccount } from '../../constants/accounts';
import HashDoxLogo from '../../components/icons/HashDoxLogo';
import HashDoxIcon from '../../components/icons/HashDoxIcon';
import URLImageComponent from '../../components/urlImage';
import MapComponent from '../../components/mapcomponent';

interface ImageLocation {
  latitude: number;
  longitude: number;
}

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
      )
    }
    const metadataObject = JSON.parse(metadata);
    if (metadataObject.hasOwnProperty('uploadThrough') && metadataObject.uploadThrough == 'server') {
      // Images uploaded by mobile app
      //console.log('media_hash & url: ', 'http://82.148.29.178/images/' + media_hash + '.png');
      return 'https://82.148.29.178/images/' + media_hash + '.png';
    }
    // Get url of image storaged in firebase (uploaded through firebase)
    return (
      'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2F' + media_hash + '.png?alt=media'
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
        <HashDoxIcon />
      </div>
    );
  }

  // Preloaded transaction hashes
  const txHashes = {
    "99db50f86507b2756183d829efc86eb70357d37c186e583cfb6979cfdcfab89e": { tx: "998iKsTJJWi4buN5YbiYVxYs2MJeqfL3GQRwqmCh4WcR", time: "April 29, 2022 at 8:27:14am" },
    "4e00110557e83f12f8dfa28a62d3e9ca0e364859f0dbe984e605a165de4ffc7a": { tx: "8GAnELPCo2VZHLQ61LrF9FsTEgAFsvQ3gRfHKNreWEon", time: "April 29, 2022 at 8:27:19am"},
    "5ae03c532ff376172511940f2dc08b2898eca8342168f3d8cc384f07951bd859": { tx: "DWf5BnqLPoSiBfGJDSxmcS5Vhkq4ff1xDRbqB3NsFjvT", time: "April 29, 2022 at 8:27:25am"},
    "7e907833c6233ff27c5f928fd1c60cf5112381675258925c1676b5a3a2231835": { tx: "FVBFN4dax9H8fJykiTs6Buau4csL2dc7CRSycnqX35ba", time: "April 29, 2022 at 8:27:30am"},
    "9a7516f8e2edf3d13e04e66d3eb8de4cd236e66f49a513e8a5b9b247906af72b": { tx: "ABhVtxHeXDHhKX28xnTqNFhcDqskQXMVUtwYmreGyyVg", time: "April 29, 2022 at 8:27:35am"},
    "395addc5cdbf628e273e3e059c16c08dcb65d432848756d35ab898742177ecd4": { tx: "CoXFvzxNQUoeEir2WywzdxgxfjvM7tYDfiF6vVeLprmk", time: "April 29, 2022 at 8:27:41am"},
    "1778955f366bb24ca9f1ca74646768ad44c419cc8cb31dfd19ea38f1ab158369": { tx: "2VY59bktqdpX91J4GiXpx5cDDfiwevvtZJ6jtWnPLBqt", time: "April 29, 2022 at 8:27:53am"},
    "9825679226b72456cd082d75bbd6a845d8ceadfa506fcc978b30f54723db6b78": { tx: "6SvSjHm5yRLDay3ugVV6KUsFQT2q5LTA4VBy4P1vaCVJ", time: "April 29, 2022 at 8:27:59am" },
    "69407975431f5177f7e9bb3252a399669192bdf007da1cb524a023bcc30d9dc5": { tx: "CFvKsfSuy7T9FB1x8iUyJemRQPVHtPDRnGC2XZHG2Fyu", time: "April 29, 2022 at 8:28:05am"},
    "e56824cfb04e44dd3115db9dc47811eda59b1cd692a2a8a494c2b09145b68b85": { tx: "3vhyPHNo1t3ZrY7KeLAFZt9RPrWeHqDGAUnZCM362nhF", time: "April 29, 2022 at 8:28:11am"},
  }  

  // Return block with transactions data
  const getTransactionsBlock = () => {
    return (
      <div className="flex flex-1 flex-col">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'black',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0px 12px 0px 24px',
          }}
        >
          <HashDoxLogo />
          <p className="font-rational text-[10px] w-64 text-white mt-3">
            Hashd0x is a platform and a tool for instant and spoof-proof registration of metadata and image hashing
            records in Near Protocol and Ethereum Swarm blockchains.
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 0 0 24px',
          }}
        >
          <p className="font-rational text-white text-[12px] mb-2">TRANSACTIONS</p>
          {/* <p className="font-rational text-white text-[12px] mb-2">FILEHASHES</p> */}
          <ul className="font-rational text-white text-[10px] overflow-y-scroll h-[370px] no-scrollbar pl-0">
            {evidences.map((evidence, index) => {
              const explorerUriPrefix = "https://explorer.testnet.near.org/transactions/";              
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
                  {txHashes[evidence.media_hash].tx ?? TRX_HASH_EXAMPLE} at {txHashes[evidence.media_hash].time ?? getDateFromTimestamp(Math.floor(Date.now()))}
                  </p>
                  <p>
                  <Link href={explorerUriPrefix + txHashes[evidence.media_hash].tx}>
                    <a target="_blank" className="hover:text-gray-600 underline underline-offset-2 cursor-pointer">{evidence.media_hash}</a>
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

  // Return block with corresponding image
  const getImageBlock = () => {
    const image_url = getImageSource(evidences[activeEvidenceIndex]);
    return (
      <div className="flex flex-1 justify-center align-center">
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
      <div
        // className="flex flex-1 justify-center items-center"
        style={{ display: 'flex:', flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
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
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', paddingBottom: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 8 }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <p className="font-rational text-white text-[12px]">SIGNED</p>
                <p className="font-rational text-white text-[10px]">{signedBy}</p>
              </div>
              <div>
                <p className="font-rational pl-4 text-white text-[12px]">TIMESTAMP</p>
                <p className="font-rational pl-4 text-white text-[10px]">
                  {/* {getDateFromTimestamp(Math.floor(Date.now() / 1000))} */}
                  {txHashes[evidence.media_hash].time ?? getDateFromTimestamp(Math.floor(Date.now() / 1000))}
                  {/* Unknown */}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <p className="font-rational text-white text-[12px]">FILEHASH</p>
              <p className="font-rational text-white text-[8px] self-end">Powered by Swarm</p>
            </div>
            <p className="p-1 pb-0 font-rational text-white text-[12px] border w-full">{cutHash(media_hash, 40)}</p>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <p className="font-rational text-white text-[12px]">HASHMARK</p>
              <p className="font-rational text-white text-[8px] self-end">Powered by NEAR</p>
            </div>
            <p className="p-1 pb-0 font-rational text-white text-[12px] border w-full">{cutHash(txHashes[evidence.media_hash].tx ?? TRX_HASH_EXAMPLE, 40)}</p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 14,
              }}
            >
              <div>
                <p className="font-rational text-white text-[12px]">LOCATION DATA</p>
                <p className="font-rational text-white text-[10px]">{JSON.stringify(location)}</p>
              </div>
              <p className="ml-4 font-rational text-white text-[8px] w-44">
                Location data can be spoofed or faked at several levels of the operating system, GPS or VPN
              </p>
            </div>
          </div>
        </div>
      );
    } catch (err) {
      const { media_hash } = evidences[activeEvidenceIndex];
      return (
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', paddingBottom: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 8 }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <p className="font-rational text-white text-[12px]">SIGNED</p>
                <p className="font-rational text-white text-[10px]">Unknown</p>
              </div>
              <div>
                <p className="font-rational text-white text-[12px]">TIMESTAMP</p>
                <p className="font-rational text-white text-[10px]">
                  {/* {getDateFromTimestamp(Math.floor(Date.now() / 1000))} */}
                  Unknown
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <p className="font-rational text-white text-[12px]">FILEHASH</p>
              <p className="font-rational text-white text-[8px] self-end">Powered by Swarm</p>
            </div>
            <p className="p-1 pb-0 font-rational text-white text-[12px] border w-full">{cutHash(media_hash, 40)}</p>
            {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <p className="font-rational text-white text-[12px]">HASHMARK</p>
              <p className="font-rational text-white text-[8px] self-end">Powered by NEAR</p>
            </div>
            <p className="p-1 pb-0 font-rational text-white text-[12px] border w-full">{cutHash(TRX_HASH_EXAMPLE, 40)}</p> */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 14,
              }}
            >
              <div>
                <p className="font-rational text-white text-[12px]">LOCATION DATA</p>
                <p className="font-rational text-white text-[10px]">{JSON.stringify(location)}</p>
              </div>
              <p className="ml-4 font-rational text-white text-[8px] w-44">
                Location data can be spoofed or faked at several levels of the operating system, GPS or VPN
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh' }}>
      <div className="flex flex-1 flex-col sm:flex-row">
        {getTransactionsBlock()}
        {getImageBlock()}
      </div>
      <div className="flex flex-1 flex-col sm:flex-row">
        {getMapBlock()}
        {getEvidenceDataBlock()}
      </div>
    </div>
  );
};

export default DashboardTable;
