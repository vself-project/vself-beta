import React, { useEffect, useRef } from 'react';

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
  });

  return <div ref={ref} id="map" style={{ height: 300 }} className="mb-4 pb-2" />;
};

export default MapComponent;
