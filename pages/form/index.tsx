import React, { useState } from 'react';
import type { NextPage } from 'next';
import UploadImage from '../../components/uploadImage';
import exifr from 'exifr';
import { uploadImageToFirebase } from '../../utils/firebase';

const WebImageUploadForm: NextPage = () => {
  const [metaData, setMetaData] = useState(null);
  const [imgFile, setNewImgFile] = useState<File>();
  const onImageChange = async (file: File): Promise<void> => {
    const output = await exifr.parse(file, true);
    // const { latitude, longitude } = output;
    // console.log('output: ', output);
    setNewImgFile(file);
    setMetaData(output);
  };
  const sendImage = async () => {
    if (imgFile !== undefined) {
      const downloadUrl = await uploadImageToFirebase(imgFile);
      console.log('downloadUrl: ', downloadUrl);
    }
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
      <button
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        type="button"
        disabled={!metaData}
        onClick={sendImage}
      >
        Send
      </button>
    </div>
  );
};

export default WebImageUploadForm;
