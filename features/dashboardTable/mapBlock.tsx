/* eslint-disable no-prototype-builtins */
import React from 'react';
import MapComponent from '../../components/mapcomponent';

const LOCATION_DEFAULT = {
  lat: 47.662465,
  lng: -25.367988,
};
const LOCATION_PRELOADED = {
  lat: 49.887742,
  lng: 30.977597,
};

interface MapBlockProps {
  evidence: any;
}

const MapBlock: React.FC<MapBlockProps> = ({ evidence }) => {
  let { lat, lng } = LOCATION_PRELOADED;
  let zoom = 6;
  let marker = false;
  try {
    const { metadata } = evidence;
    const metadataObject = JSON.parse(metadata);
    let { location } = metadataObject;
    if (location == 'unknown' || location === undefined) {
      throw Error('Location is unknown or undefined');
    }

    // Check how evidence had been uploaded
    if (metadataObject.hasOwnProperty('uploadThrough') && metadataObject.uploadThrough == 'server') {
      location = location.split(' ');
      lat = Number(location[0].slice(0, -1));
      lng = Number(location[1].slice(0, -1));
    } else {
      // TO DO check location from evidence uploaded through web app (JSON.parse error in mock data)
      lat = Number(location.latitude);
      lng = Number(location.longitude);
    }
    zoom = 11;
    marker = true;
    // eslint-disable-next-line no-empty
  } catch (err) {}
  return (
    <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <div className="self-center h-full">
        <MapComponent height="100%" center={{ lat, lng }} zoom={zoom} marker={marker} />
      </div>
    </div>
  );
};

export default MapBlock;
