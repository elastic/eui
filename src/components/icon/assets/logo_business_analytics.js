import React from 'react';

const EuiIconLogoBusinessAnalytics = props => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="#00BFB3"
        d="M0 22c0 5.522 4.478 10 10 10V12C4.478 12 0 16.478 0 22"
      />
      <path
        className="euiIcon__fillNegative"
        d="M10 12v10h10c0-5.522-4.478-10-10-10"
      />
      <path
        fill="#F04E98"
        d="M10 0v9c7.168 0 13 5.832 13 13h9C32 9.85 22.15 0 10 0"
      />
    </g>
  </svg>
);

export const icon = EuiIconLogoBusinessAnalytics;
