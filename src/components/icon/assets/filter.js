import React from 'react';

const EuiIconFilter = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path
      fillRule="evenodd"
      d="M7.999 15.999a8 8 0 110-16 8 8 0 010 16zM8 15A7 7 0 108 1a7 7 0 000 14zM3.5 5h9a.5.5 0 110 1h-9a.5.5 0 010-1zm2 3h5a.5.5 0 110 1h-5a.5.5 0 010-1zm2 3h1a.5.5 0 110 1h-1a.5.5 0 110-1z"
    />
  </svg>
);

export const icon = EuiIconFilter;
