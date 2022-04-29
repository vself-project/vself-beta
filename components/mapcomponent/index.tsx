import React, { useEffect, useRef } from 'react';

interface MapComponentProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  height?: number | string;
  marker?: boolean;
}

const LOCATION_DEFAULT = {
  lat: 47.662465,
  lng: -25.367988,
};

const MapComponent: React.FC<MapComponentProps> = ({ center, zoom, height, marker }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current !== null) {
      const map = new window.google.maps.Map(ref.current, {
        center: isNaN(center.lat) ? { lat: LOCATION_DEFAULT.lat, lng: LOCATION_DEFAULT.lng } : center,
        zoom: isNaN(center.lat) ? 2 : zoom,
        disableDefaultUI: true,
      });
      map.setOptions({
        styles,
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

const styles = [
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [
      {
        saturation: 36,
      },
      {
        color: '#000000',
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#000000',
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 29,
      },
      {
        weight: 0.2,
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#0f252e',
      },
      {
        lightness: 17,
      },
    ],
  },
];

export default MapComponent;
