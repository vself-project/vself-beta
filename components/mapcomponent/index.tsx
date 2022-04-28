import React, { useEffect, useRef } from 'react';

interface MapComponentProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  height: number;
  marker?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ center, zoom, height, marker }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current !== null) {
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        disableDefaultUI: true,
      });
      if (marker) {
        new window.google.maps.Marker({
          position: center,
          map,
          title: '',
        });
      }
    }
  });

  return <div ref={ref} id="map" style={{ height }} className="mb-4 pb-2" />;
};

export default MapComponent;
