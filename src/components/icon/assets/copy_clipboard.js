import React from 'react';

const EuiIconCopyClipboard = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path d="M0 2.729V2a1 1 0 0 1 1-1h2v1H1v12h4v1H1a1 1 0 0 1-1-1V2.729zM12 5V2a1 1 0 0 0-1-1H9v1h2v3h1zm-1 1h2v9H6V6h5V5H6a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2v1z" />
    <path d="M7 10h5V9H7zM7 8h5V7H7zM7 12h5v-1H7zM7 14h5v-1H7zM9 2V1a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v1h1V1h4v1h1zM3 3h6V2H3z" />
  </svg>
);

export const icon = EuiIconCopyClipboard;
