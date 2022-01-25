import React from 'react';

const RemoveIcon: React.FC = () => (
  <svg
    className="h-8 w-8 text-gray-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {' '}
    <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" /> <line x1="18" y1="9" x2="12" y2="15" />{' '}
    <line x1="12" y1="9" x2="18" y2="15" />
  </svg>
);

export default RemoveIcon;
