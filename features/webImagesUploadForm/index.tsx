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

interface ImageLocation {
  latitude: number;
  longitude: number;
}

const WebImageUploadForm = () => {
  const { account_id } = useAppSelector((state) => state.userAccountReducer);
  const [metaData, setMetaData] = useState<Record<string, unknown> | null>(null);
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
    setImgLocation(imageLocation);
    setNewImgFile(file);
    setMetaData(output);
    setStep(Steps.CONFIRM_STEP);
  };

  const sendImage = async () => {
    if (imgFile) {
      setIsLoading(true);
      const downloadUrl = await uploadImageToFirebase(imgFile);
      const { contract } = await getPOWAccountAndContract(account_id);
      const arrayBuffer = await imgFile.arrayBuffer();
      const hash = sha3_256(arrayBuffer);
      await contract.upload_evidence({
        evidence: {
          media_hash: hash,
          metadata: JSON.stringify({
            downloadUrl,
            ...metaData,
            ...location,
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
          {imgFile && <FileImageComponent file={imgFile} height={500} width={281} />}
          <div>
            <span>Signed:</span>
            <span>{account_id}</span>
            <span>Timestamp:</span>
            <span>
              {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
            </span>
          </div>
          <div>
            <button type="button" className="text-white" onClick={startCamera}>
              Back
            </button>
            <button type="button" className="text-black bg-white uppercase px-5" onClick={sendImage}>
              Issue a hashmark
            </button>
          </div>
        </div>
      );
    case Steps.INFO_STEP:
      return (
        <>
          {location && <MapComponent center={{ lat: location.latitude, lng: location.longitude }} zoom={8} />}
          <button type="button" onClick={clearState} className="text-black bg-white px-5">
            Done
          </button>
        </>
      );
    default:
      return (
        <ReactPageScroller blockScrollUp>
          <div className="flex content-center flex-wrap h-full">
            <div className="px-6">
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
              <p className="font-rational bottom-0">
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
