import React from 'react';

const EuiIconEmail = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path
      fillRule="evenodd"
      d="M14.95 3.684L8.637 8.912a1 1 0 01-1.276 0L1.051 3.684A.999.999 0 001 4v8a1 1 0 001 1h12a1 1 0 001-1V4a.999.999 0 00-.05-.316zM2 2h12a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V4a2 2 0 012-2zm-.21 1l5.576 4.603a1 1 0 001.27.003L14.268 3H1.79z"
    />
  </svg>
);

export const icon = EuiIconEmail;
