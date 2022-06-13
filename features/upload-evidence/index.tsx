/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import exifr from 'exifr';
import { sha3_256 } from 'js-sha3';
import ReactPageScroller from 'react-page-scroller';
import { useAppSelector } from '../../hooks';
import { getCoords, getPOWAccountAndContract } from '../../utils';
import { uploadImageToFirebase } from '../../utils/firebase';
// Components
import MapComponent from '../../components/mapcomponent';
// import { StylesCSS } from '../../constants/styles';
import CameraComponent from '../../components/cameraComponent';
import HashDoxIcon from '../../components/icons/HashDoxIcon';
import FileImageComponent from '../../components/fileImage';
import { Steps } from './enums';
import ArrowsIcon from '../../components/icons/ArrowsIcon';
import { cutHash, getDateFromTimestamp, TRX_HASH_EXAMPLE } from '../dashboard';
import HashDoxLogo from '../../components/icons/HashDoxLogo';

interface ImageLocation {
  latitude: number;
  longitude: number;
}

const WebImageUploadForm = () => {
  const { account_id } = useAppSelector((state) => state.userAccountReducer);
  const [metaData, setMetaData] = useState<Record<string, unknown> | null>(null);
  const [newHash, setNewHash] = useState<string>('');
  const [location, setImgLocation] = useState<ImageLocation | null>(null);
  const [imgFile, setNewImgFile] = useState<File | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<string>(Steps.FIRST_STEP);

  const onImageSet = async (file: File): Promise<void> => {
    const output = await exifr.parse(file, true);
    const { latitude, longitude } = output;
    const userPosition: any = await getCoords();
    // If File Exif Data doesn't have any location coords
    // We can get browser's geolocation
    const imageLocation = latitude
      ? { latitude, longitude }
      : userPosition
      ? { latitude: userPosition.lat, longitude: userPosition.long }
      : null;
    // Setting Location and other Metadata
    const arrayBuffer = await file.arrayBuffer();
    const hash = sha3_256(arrayBuffer);
    setNewHash(hash);
    setImgLocation(imageLocation);
    setNewImgFile(file);
    setMetaData(output);
    setStep(Steps.CONFIRM_STEP);
  };

  const sendImage = async () => {
    if (imgFile) {
      setIsLoading(true);
      const downloadUrl = await uploadImageToFirebase(imgFile);
      const { contract } = await getPOWAccountAndContract();
      // TODO: add callbackUrl https://docs.near.org/docs/api/naj-quick-reference#call-contract
      await contract.upload_evidence({
        evidence: {
          media_hash: newHash,
          metadata: JSON.stringify({
            downloadUrl,
            ...metaData,
            location,
            name: account_id,
            timestamp: Date.now() * 1000,
          }),
        },
      });
      setIsLoading(false);
      setStep(Steps.INFO_STEP);
    }
  };

  if (isLoading) {
    return (
      <div className="grid place-items-center h-screen">
        <div className="text-center">
          <div className="animate-spin-slow">
            <HashDoxIcon />
          </div>
        </div>
      </div>
    );
  }

  const startCamera = () => {
    setStep(Steps.CAMERA_STEP);
  };

  const clearState = () => {
    setImgLocation(null);
    setNewImgFile(null);
    setMetaData(null);
    setStep(Steps.CAMERA_STEP);
  };

  switch (step) {
    case Steps.CAMERA_STEP:
      return <CameraComponent cameraCallback={onImageSet} />;
    case Steps.CONFIRM_STEP:
      return (
        <div className="flex flex-wrap h-screen flex-col justify-center items-center">
          <div>
            {imgFile && <FileImageComponent file={imgFile} height={500} className="w-full" />}
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center', margin: '20px 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 10 }}>
                <div
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}
                >
                  <div>
                    <p className="font-rational text-white text-[14px]">SIGNED</p>
                    <p className="font-rational text-white text-[12px]">{account_id}</p>
                  </div>
                  <div>
                    <p className="font-rational text-white text-[14px]">TIMESTAMP</p>
                    <p className="font-rational text-white text-[12px]">
                      {getDateFromTimestamp(Math.floor(Date.now() / 1000))}
                    </p>
                  </div>
                </div>
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
                    <p className="font-rational text-white text-[14px]">LOCATION DATA</p>
                    <p className="font-rational text-white text-[12px]">
                      {location?.latitude} {location?.longitude}
                    </p>
                  </div>
                  <p className="ml-4 font-rational text-white text-[10px] w-44">
                    Location data can be spoofed or faked at several levels of the operating system, GPS or VPN
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button type="button" className="text-white" onClick={startCamera}>
                Back
              </button>
              <button type="button" className="text-black bg-white uppercase px-5" onClick={sendImage}>
                Issue a hashmark
              </button>
            </div>
          </div>
        </div>
      );
    case Steps.INFO_STEP:
      return (
        <div className="flex content-center flex-wrap h-screen">
          <div style={{ maxWidth: 600, margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {location && (
              <MapComponent
                height={400}
                center={{ lat: location.latitude, lng: location.longitude }}
                zoom={12}
                marker
              />
            )}
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center', paddingBottom: 40 }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 8 }}>
                <div
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}
                >
                  <div>
                    <p className="font-rational text-white text-[12px]">SIGNED</p>
                    <p className="font-rational text-white text-[10px]">{account_id}</p>
                  </div>
                  <div>
                    <p className="font-rational text-white text-[12px]">TIMESTAMP</p>
                    <p className="font-rational text-white text-[10px]">
                      {getDateFromTimestamp(Math.floor(Date.now() / 1000))}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <p className="font-rational text-white text-[12px]">FILEHASH</p>
                  <p className="font-rational text-white text-[8px] self-end">Powered by Swarm</p>
                </div>
                <p className="p-1 pb-0 font-rational text-white text-[12px]  border w-full">{cutHash(newHash, 40)}</p>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                  <p className="font-rational text-white text-[12px]">HASHMARK</p>
                  <p className="font-rational text-white text-[8px] self-end">Powered by NEAR</p>
                </div>
                <p className="p-1 pb-0 font-rational text-white text-[12px] border w-full">
                  {cutHash(TRX_HASH_EXAMPLE, 40)}
                </p>
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
                    <p className="font-rational text-white text-[10px]">
                      {location?.latitude} {location?.longitude}
                    </p>
                  </div>
                  <p className="ml-4 font-rational text-white text-[8px] w-44">
                    Location data can be spoofed or faked at several levels of the operating system, GPS or VPN
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between mb-8">
              <p className="font-rational text-white uppercase">Explore transaction</p>
              <button type="button" onClick={clearState} className="text-black bg-white px-5">
                Done
              </button>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <ReactPageScroller blockScrollUp>
          <div className="flex content-center flex-wrap h-full p-8">
            <div style={{ maxWidth: 600, margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div className="flex justify-between" style={{ height: '15%' }}>
                <HashDoxLogo />
                <div>
                  <p>
                    <b className="font-rational">Signed as:</b>
                  </p>
                  <p className="mr-2 font-rational">{account_id}</p>
                </div>
              </div>
              <div className="px-6 flex-1 flex justify-center self-center items-center">
                <div className="justify-center flex mb-10">
                  <div>
                    <div className="animate-arrow animation-delay-200">
                      <ArrowsIcon />
                    </div>
                    <div className="animate-arrow animation-delay-100">
                      <ArrowsIcon />
                    </div>
                    <div className="animate-arrow ">
                      <ArrowsIcon />
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-rational mb-8 self-end" style={{ height: '15%' }}>
                Hashd0x is a platform and a tool for instant and spoof-proof registration of metadata and image hashing
                records in Near Protocol and Ethereum Swarm blockchains.
              </p>
            </div>
          </div>
          <CameraComponent cameraCallback={onImageSet} />
        </ReactPageScroller>
      );
  }
};

export default WebImageUploadForm;
