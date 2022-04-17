/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import exifr from 'exifr';
import { sha3_256 } from 'js-sha3';
import { useAppSelector } from '../../hooks';
import { getPOWAccountAndContract } from '../../utils';
import { renderFirebaseImage, uploadImageToFirebase } from '../../utils/firebase';
// Components
import UploadImage from '../../components/uploadImage';
import MapComponent from '../../components/mapcomponent';
import Spinner from '../../components/spinner';

interface ImageLocation {
  latitude: number;
  longitude: number;
}

interface Evidence {
  media_hash: string;
  metadata: string;
}

const WebImageUploadForm: NextPage = () => {
  const { account_id } = useAppSelector((state) => state.userAccountReducer);
  const [metaData, setMetaData] = useState<Record<string, unknown> | null>(null);
  const [location, setImgLocation] = useState<ImageLocation | null>(null);
  const [imgFile, setNewImgFile] = useState<File | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [evidences, setEvidences] = useState<Evidence[]>([]);
  const onImageChange = async (file: File): Promise<void> => {
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

  const renderMap = (status: Status): React.ReactElement => {
    if (status === Status.FAILURE) return <></>;
    return <Spinner />;
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
    <div>
      <UploadImage onImageChange={onImageChange} />
      {metaData && (
        <div>
          <h2 className="mb-2 pb-2 border-b-2">EXIF Data:</h2>
          <div
            className="break-all overflow-y-scroll mb-4 pb-2 border-b-2 mt-2"
            style={{ maxWidth: 400, maxHeight: 200 }}
          >
            {Object.keys(metaData).map((data, index) => (
              <div key={index}>
                <pre>
                  <b>{data}:</b> {JSON.stringify(metaData[data], null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
      {location && (
        <>
          <h2 className="mb-4 pb-2 border-b-2">Location:</h2>
          <Wrapper apiKey={String(process.env.GOOGLE_MAPS_API_KEY)} render={renderMap}>
            <MapComponent center={{ lat: location.latitude, lng: location.longitude }} zoom={8} />
          </Wrapper>
        </>
      )}
      {evidences.length !== 0 &&
        evidences.map((evidence, index) => (
          <div key={index}>
            <img src={renderFirebaseImage(String(evidence.media_hash))} />
          </div>
        ))}
      <button
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        type="button"
        disabled={!metaData}
        onClick={sendImage}
      >
        Send
      </button>
      <button
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        type="button"
        onClick={getEvidences}
      >
        Get
      </button>
    </div>
  );
};

export default WebImageUploadForm;
