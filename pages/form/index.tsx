import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import exifr from 'exifr';
import UploadImage from '../../components/uploadImage';
import { uploadImageToFirebase } from '../../utils/firebase';
import MapComponent from '../../components/mapcomponent';
import Spinner from '../../components/spinner';
import { getPOWAccountAndContract } from '../../utils';
import { useAppSelector } from '../../hooks';

interface ImageLocation {
  latitude: number;
  longitude: number;
}

const WebImageUploadForm: NextPage = () => {
  const { account_id } = useAppSelector((state) => state.userAccountReducer);
  const [metaData, setMetaData] = useState(null);
  const [location, setImgLocation] = useState<ImageLocation | null>(null);
  const [imgFile, setNewImgFile] = useState<File>();
  const onImageChange = async (file: File): Promise<void> => {
    const output = await exifr.parse(file, true);
    const { latitude, longitude } = output;
    setImgLocation(latitude !== undefined ? { latitude, longitude } : null);
    setNewImgFile(file);
    setMetaData(output);
  };
  const sendImage = async () => {
    if (imgFile !== undefined) {
      const downloadUrl = await uploadImageToFirebase(imgFile);
      const { contract } = await getPOWAccountAndContract(account_id);
      await contract.upload_evidence({
        evidence: {
          media_hash: String(downloadUrl),
          metadata: String(new Date()),
        },
      });
    }
  };
  const getEvidences = async () => {
    const { contract } = await getPOWAccountAndContract(account_id);
    const evidences = await contract.get_evidences({ from_index: 0, limit: 10 });
    console.log('evidences: ', evidences);
  };
  const renderMap = (status: Status): React.ReactElement => {
    if (status === Status.FAILURE) return <></>;
    return <Spinner />;
  };

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
        disabled={!metaData}
        onClick={getEvidences}
      >
        Get
      </button>
    </div>
  );
};

export default WebImageUploadForm;
