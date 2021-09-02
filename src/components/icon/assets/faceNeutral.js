import * as React from 'react';

const EuiIconFaceNeutral = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M8 16A8 8 0 118 0a8 8 0 010 16zm0-1.067A6.933 6.933 0 108 1.067a6.933 6.933 0 000 13.866zM5.333 6.4a1.067 1.067 0 110-2.133 1.067 1.067 0 010 2.133zm5.334 0a1.067 1.067 0 110-2.133 1.067 1.067 0 010 2.133zM3.2 10.667a.533.533 0 010-1.067h9.6a.533.533 0 110 1.067H3.2z"
      fillRule="evenodd"
    />
  </svg>
);

export const icon = EuiIconFaceNeutral;
