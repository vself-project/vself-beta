/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import exifr from 'exifr';
import { sha3_256 } from 'js-sha3';
import { useAppSelector } from '../../hooks';
import { getPOWAccountAndContract } from '../../utils';
import { renderFirebaseImage, uploadImageToFirebase } from '../../utils/firebase';
// Components
import UploadImageButton from '../../components/uploadImageButton';
import MapComponent from '../../components/mapcomponent';
import Spinner from '../../components/spinner';
import JSONcomponent from '../../components/JSONcomponent';
import { StylesCSS } from '../../constants/styles';
import CameraButton from '../../components/cameraButton';
import CameraComponent from '../../components/cameraComponent';
import Modal from '../../components/modal';

interface ImageLocation {
  latitude: number;
  longitude: number;
}

interface Evidence {
  media_hash: string;
  metadata: string;
}

const WebImageUploadForm = () => {
  const { account_id } = useAppSelector((state) => state.userAccountReducer);
  const [metaData, setMetaData] = useState<Record<string, unknown> | null>(null);
  const [location, setImgLocation] = useState<ImageLocation | null>(null);
  const [imgFile, setNewImgFile] = useState<File | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [evidences, setEvidences] = useState<Evidence[]>([]);

  const cameraButtonCallback = () => setIsModal(true);
  const cameraCloseCallback = () => setIsModal(false);

  const onImageSet = async (file: File): Promise<void> => {
    const output = await exifr.parse(file, true);
    const { latitude, longitude } = output;
    setImgLocation(latitude !== undefined ? { latitude, longitude } : null);
    setNewImgFile(file);
    setMetaData(output);
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
          }),
        },
      });
      setIsLoading(false);
      setImgLocation(null);
      setNewImgFile(null);
      setMetaData(null);
    }
  };

  const getEvidences = async () => {
    const { contract } = await getPOWAccountAndContract(account_id);
    const evidencesArray = await contract.get_evidences({ from_index: 0, limit: 10 });
    console.log('evidencesArray: ', evidencesArray);
    setEvidences(evidencesArray);
  };

  if (isLoading) {
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

  return (
    <>
      <Modal isOpened={isModal} closeCallback={cameraCloseCallback}>
        <CameraComponent cameraCallback={onImageSet} closeCallback={cameraCloseCallback} />
      </Modal>
      <div>
        <CameraButton callback={cameraButtonCallback} />
        <UploadImageButton onImageSet={onImageSet} />
        {metaData && <JSONcomponent json={metaData} title="EXIF Data:" />}
        {location && (
          <>
            <h2 className="mb-4 pb-2 border-b-2">Location:</h2>
            <MapComponent center={{ lat: location.latitude, lng: location.longitude }} zoom={8} />
          </>
        )}
        {evidences.length !== 0 &&
          evidences.map((evidence, index) => (
            <div key={index}>
              <img src={renderFirebaseImage(String(evidence.media_hash))} />
            </div>
          ))}
        <button className={StylesCSS.PRIMARY_BUTTON} type="button" disabled={!metaData} onClick={sendImage}>
          Send
        </button>
        <button className={StylesCSS.PRIMARY_BUTTON} type="button" onClick={getEvidences}>
          Get
        </button>
      </div>
    </>
  );
};

export default WebImageUploadForm;
