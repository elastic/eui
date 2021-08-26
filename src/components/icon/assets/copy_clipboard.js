import * as React from 'react';

const EuiIconCopyClipboard = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M2 2.729V2a1 1 0 011-1h2v1H3v12h4v1H3a1 1 0 01-1-1V2.729zM14 5V2a1 1 0 00-1-1h-2v1h2v3h1zm-1 1h2v9H8V6h5V5H8a1 1 0 00-1 1v9a1 1 0 001 1h7a1 1 0 001-1V6a1 1 0 00-1-1h-2v1z" />
    <path d="M9 10h5V9H9v1zm0-2h5V7H9v1zm0 4h5v-1H9v1zm0 2h5v-1H9v1zm2-12V1a1 1 0 00-1-1H6a1 1 0 00-1 1v1h1V1h4v1h1zM5 3h6V2H5v1z" />
  </svg>
);

export const icon = EuiIconCopyClipboard;
