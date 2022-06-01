import React from 'react';

const EvidenceDataBlock: React.FC = () => {
  // try {
  //   const evidence = evidences[activeEvidenceIndex];
  //   const { metadata, media_hash } = evidence;
  //   let signedBy = powAccount;
  //   let location: any = 'Ukraine';
  //   if (metadata !== 'preloaded') {
  //     const metadataObject = JSON.parse(metadata);
  //     if (!metadataObject.hasOwnProperty('uploadThrough') || metadataObject.uploadThrough != 'server') {
  //       signedBy = metadataObject.name;
  //       if (signedBy === undefined) {
  //         signedBy = 'Unknown';
  //       }
  //     }

  //     location = metadataObject.location;
  //     if (location == undefined) {
  //       location = 'Unknown';
  //     } else if (!metadataObject.hasOwnProperty('uploadThrough') || metadataObject.uploadThrough != 'server') {
  //       const { lat, lng } = location;
  //       if (lat != undefined && lng != undefined) {
  //         location = String(location.lat) + 'N  ' + location.lng + 'E';
  //       }
  //     }
  //   }
  //   // eslint-disable-next-line no-empty
  // } catch (err) {}
  return (
    <div className="flex flex-1 justify-center pb-[40px]">
      <div className="flex flex-col justify-center p-[8px]">
        <div className="flex flex-row justify-between mb-[10px]">
          <div>
            <p className="font-rational text-white text-[12px]">SIGNED</p>
            {/* <p className="font-rational text-white text-[10px]">{signedBy}</p> */}
          </div>
          <div>
            <p className="font-rational pl-4 text-white text-[12px]">TIMESTAMP</p>
            <p className="font-rational pl-4 text-white text-[10px]">
              {/* {getDateFromTimestamp(Math.floor(Date.now() / 1000))} */}
              {/* {txHashes[evidence.media_hash].time ?? getDateFromTimestamp(Math.floor(Date.now() / 1000))} */}
              {/* Unknown */}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <p className="font-rational text-white text-[14px]">FILEHASH</p>
          <p className="font-rational text-white text-[10px] self-end">Powered by Swarm</p>
        </div>
        {/* <p className="p-1 pb-0 font-rational text-white text-[14px] border w-full">{cutHash(media_hash, 40)}</p> */}
        <div className="flex flex-row justify-between mt-2">
          <p className="font-rational text-white text-[14px]">HASHMARK</p>
          <p className="font-rational text-white text-[10px] self-end">Powered by NEAR</p>
        </div>
        <p className="p-1 pb-0 font-rational text-white text-[14px] border w-full">
          {/* {cutHash(txHashes[evidence.media_hash].tx ?? TRX_HASH_EXAMPLE, 40)} */}
        </p>
        <div className="flex flex-row justify-between w-full mt-3">
          <div>
            <p className="font-rational text-white text-[14px]">LOCATION DATA</p>
            {/* <p className="font-rational text-white text-[12px]">{JSON.stringify(location)}</p> */}
          </div>
          <p className="ml-4 font-rational text-white text-[10px] w-44">
            Location data can be spoofed or faked at several levels of the operating system, GPS or VPN
          </p>
        </div>
      </div>
    </div>
  );
};
