/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { renderFirebaseImage } from '../../utils/firebase';

// Components
import Spinner from '../../components/spinner';
import { Evidence } from '../../models/Evidence';

interface ImageLocation {
  latitude: number;
  longitude: number;
}

interface DashboardTableProps {
  evidences: Evidence[],
  from: number
}

// Constants
const TRX_HASH_EXAMPLE = '2mtMSbfb26ojrn8ZPRwodExQDWkM4qw2wGDhPQrnSATj';
const getDateFromTimestamp = (timestamp: any) => {
  const date = new Date(timestamp);
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
const getImageUploadedFromApp = (hash: string) => {
  return "http://82.148.29.178/images/be85c1237b9ec9aeec6c092de297f4dd.png";
  return "http://82.148.29.178/images/" + hash + ".png";
}

// TO DO check that case
const DashboardTable: React.FC<DashboardTableProps> = ({ evidences, from }) => {
  if (!evidences.length) {
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
  console.log({ evidences });

  const getImageCard = () => {
    return (
      <div className="rounded-lg shadow-lg bg-white max-w-sm h-full">
        <a href="#!">
          <img className="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt="The image isn't available."/>
        </a>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">Data</h5>
          <p className="text-gray-700 text-base mb-4">
            Some quick example text to build on the card title and make up the bulk of the card's
            content.
          </p>
        </div>
      </div>
    )
  }

  const getDataTable = () => {
    return (
      <div className="flex flex-col max-h-64">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      #
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Trx Hash
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Trx Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {evidences.map((evidence, index) => {
                    return (
                      <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{from + index}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {TRX_HASH_EXAMPLE}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {getDateFromTimestamp(Math.floor(Date.now() / 1000))}
                      </td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getMapBlock = () => {
    return (
      <div className="h-64 bg-stone-500">Map</div>
    )
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', backgroundColor: "pink", width: '100%', height: '100%' }}>
      <h2 className="">Evidences</h2>
      <div className="flex justify-center	bg-stone-100">
        <div className="flex flex-row columns-2 bg-stone-400">
          <div className="flex flex-col basis-1/2 bg-orange-400 max-w-2xl">
            <div className="block rounded-lg shadow-lg bg-white p-4 pr-10 mr-2 mb-2">
              {getDataTable()}
            </div>
            <div className="block rounded-lg shadow-lg bg-white p-4 mr-2">
             {getMapBlock()}
            </div>
          </div>
          <div className="basis-1/2">
          {getImageCard()}
          </div>
        </div>
      </div>
      {/* <div className="w-full p-1 md:p-2">
        <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
          src={getImageUploadedFromApp(evidences[0].media_hash)}
        />
      </div> */}
    </div>
  );
};

export default DashboardTable;
