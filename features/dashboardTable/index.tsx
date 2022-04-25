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
  evidences: Evidence[]
}

const DashboardTable: React.FC<DashboardTableProps> = ({ evidences }) => {
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

  return (
    <div>
      {evidences.map((evidence, index) => (
        <div key={index}>
          <img src={renderFirebaseImage(String(evidence.media_hash))} />
        </div>
      ))}
    </div>
  );
};

export default DashboardTable;
