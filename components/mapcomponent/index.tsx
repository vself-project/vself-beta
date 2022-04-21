import { Status, Wrapper } from '@googlemaps/react-wrapper';
import React, { useEffect, useRef } from 'react';
import Spinner from '../spinner';

interface MapComponentProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ center, zoom }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current !== null) {
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        disableDefaultUI: true,
      });
      new window.google.maps.Marker({
        position: center,
        map,
        title: '',
      });
    }
  }, [center, zoom]);

  const renderMap = (status: Status): React.ReactElement => {
    if (status === Status.FAILURE) return <></>;
    return <Spinner />;
  };

  return (
    <Wrapper apiKey={String(process.env.GOOGLE_MAPS_API_KEY)} render={renderMap}>
      <div ref={ref} id="map" style={{ height: 300 }} className="mb-4 pb-2" />
    </Wrapper>
  );
};

export default MapComponent;
