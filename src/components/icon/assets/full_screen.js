import React from 'react';

const EuiIconFullScreen = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M13 3v4h-1V4H9V3h4zM3 3h4v1H4v3H3V3zm10 10H9v-1h3V9h1v4zM3 13V9h1v3h3v1H3zM0 1.994C0 .893.895 0 1.994 0h12.012C15.107 0 16 .895 16 1.994v12.012A1.995 1.995 0 0114.006 16H1.994A1.995 1.995 0 010 14.006V1.994zm1 0v12.012c0 .548.446.994.994.994h12.012a.995.995 0 00.994-.994V1.994A.995.995 0 0014.006 1H1.994A.995.995 0 001 1.994z"
      fillRule="evenodd"
    />
  </svg>
);

export const icon = EuiIconFullScreen;
