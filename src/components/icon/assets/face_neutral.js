import React from 'react';

const EuiIconFaceNeutral = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g fill="#13252D" fillRule="evenodd">
      <circle cx={5} cy={5} r={1} />
      <circle cx={10} cy={5} r={1} />
      <path
        fillRule="nonzero"
        d="M7.5 14a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zm0 1a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
      />
      <path fillRule="nonzero" d="M3 10h9a.5.5 0 1 0 0-1H3a.5.5 0 0 0 0 1z" />
    </g>
  </svg>
);

export const icon = EuiIconFaceNeutral;
