import React from 'react';

const EuiIconVideoPlayer = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g fill="#000" fillRule="nonzero">
      <path d="M15 4V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zm0 1H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5zM2 0h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
      <path d="M2.5 3h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1zm3 0h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1zM5 7.6v5a.5.5 0 0 0 .724.447l5-2.5a.5.5 0 0 0 0-.894l-5-2.5A.5.5 0 0 0 5 7.6zm4.382 2.5L6 11.791V8.409L9.382 10.1z" />
    </g>
  </svg>
);

export const icon = EuiIconVideoPlayer;
