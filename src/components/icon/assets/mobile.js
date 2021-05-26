import * as React from 'react';

const EuiIconMobile = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M6 2.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.5 0A1.5 1.5 0 003 1.5v13A1.5 1.5 0 004.5 16h7a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0011.5 0h-7zM4 1.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5V4H4V1.5zM4 13v1.5a.5.5 0 00.5.5h7a.5.5 0 00.5-.5V13H4zm0-1h8V5H4v7z"
    />
  </svg>
);

export const icon = EuiIconMobile;
