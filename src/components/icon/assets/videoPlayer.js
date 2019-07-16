import React from 'react';

const EuiIconVideoPlayer = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path d="M0 1.994C0 .893.895 0 1.994 0h12.012C15.107 0 16 .895 16 1.994v12.012A1.995 1.995 0 0 1 14.006 16H1.994A1.995 1.995 0 0 1 0 14.006V1.994zm1 0v12.012c0 .548.446.994.994.994h12.012a.995.995 0 0 0 .994-.994V1.994A.995.995 0 0 0 14.006 1H1.994A.995.995 0 0 0 1 1.994zM1 4h14v1H1V4zm1.5-1a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm3 0a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm4.947 6.106a1 1 0 0 1 0 1.788l-3 2A1 1 0 0 1 6 12V8a1 1 0 0 1 1.447-.894l3 2zM10 10L7 8v4l3-2z" />
  </svg>
);

export const icon = EuiIconVideoPlayer;
