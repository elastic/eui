import React from 'react';

const EuiIconPopout = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      fillRule="evenodd"
      d="M2 14.01h12.49a.5.5 0 1 1 0 1h-13a.5.5 0 0 1-.49-.597V1.5a.5.5 0 0 1 1 0v12.51zm2.354-1.656a.5.5 0 0 1-.708-.708l8-8a.5.5 0 0 1 .708.708l-8 8zM15 5.5a.5.5 0 1 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 1 1 0-1h3A1.5 1.5 0 0 1 15 2.5v3z"
    />
  </svg>
);

export const icon = EuiIconPopout;
