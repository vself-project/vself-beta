/* eslint-disable no-prototype-builtins */
/* eslint-disable no-empty */
import React from 'react';
import { getDateFromTimestamp, TRX_HASH_EXAMPLE } from '.';
import HashDoxIcon from '../../components/icons/HashDoxIcon';
import { txHashes } from '../../mockData/mockEvidences';

interface EvidenceBlockProps {
  evidence: any;
}

export const cutHash = (hash: string, limit: number) => {
  if (hash.length > limit) {
    return hash.slice(0, limit - 3) + '...';
  }
  return hash;
};

const EvidenceBlock: React.FC<EvidenceBlockProps> = ({ evidence }) => {
  let signedBy = 'powAccount';
  let location: any = 'Ukraine';
  if (evidence === undefined) {
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
  const { metadata, media_hash } = evidence;
  console.log('evidence: ', evidence);
  try {
    if (metadata !== 'preloaded' && metadata !== '') {
      console.log('metadata: ', metadata);
      const metadataObject = JSON.parse(String(metadata));
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
  } catch (err) {}

  return (
    <div className="flex flex-col justify-center p-[8px]" style={{ minWidth: '100%' }}>
      <div className="flex flex-row justify-between mb-[10px]">
        <div>
          <p className="font-rational text-white text-[12px]">SIGNED</p>
          <p className="font-rational text-white text-[10px]">{signedBy}</p>
        </div>
        <div>
          <p className="font-rational pl-4 text-white text-[12px]">TIMESTAMP</p>
          <p className="font-rational pl-4 text-white text-[10px]">
            {getDateFromTimestamp(Math.floor(Date.now() / 1000))}
            {/* {txHashes[evidence.media_hash].time ?? getDateFromTimestamp(Math.floor(Date.now() / 1000))} */}
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
        {cutHash(txHashes[evidence.media_hash]?.tx ?? TRX_HASH_EXAMPLE, 40)}
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
  );
};

export default EvidenceBlock;
