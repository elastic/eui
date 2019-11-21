import React from 'react';

const EuiIconBullseye = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M8 14A6 6 0 108 2a6 6 0 000 12zm0 1A7 7 0 118 1a7 7 0 010 14zm0-3a4 4 0 100-8 4 4 0 000 8zm0-1a3 3 0 110-6 3 3 0 010 6zm0-2a1 1 0 100-2 1 1 0 000 2z" />
  </svg>
);

export const icon = EuiIconBullseye;
