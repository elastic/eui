import React from 'react';

const EuiIconExpandMini = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      fillRule="evenodd"
      d="M6.707 10L10 6.707A.5.5 0 0 0 9.293 6L6 9.293a.5.5 0 1 0 .707.707zM4 9.5a.5.5 0 0 1 1 0v1a.5.5 0 0 0 .5.5h1a.5.5 0 1 1 0 1h-1A1.5 1.5 0 0 1 4 10.5v-1zm8-3a.5.5 0 1 1-1 0v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 1 0-1h1A1.5 1.5 0 0 1 12 5.5v1z"
    />
  </svg>
);

export const icon = EuiIconExpandMini;
