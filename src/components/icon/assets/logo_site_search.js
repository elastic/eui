import React from 'react';

const EuiIconLogoSiteSearch = props => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="#FA744E"
        d="M27.05 10h-7.34l-11 22s15.696-4.96 21.855-16.076C32.037 13.266 30.088 10 27.05 10"
      />
      <path
        fill="#00BFB3"
        d="M21.355 0H7.533L.427 14.211C-.903 16.871 1.032 20 4.004 20h7.351l10-20z"
      />
      <path
        className="euiIcon__fillNegative"
        d="M2.533 10L.428 14.211C-.903 16.871 1.032 20 4.005 20h7.35l5-10H2.533z"
      />
    </g>
  </svg>
);

export const icon = EuiIconLogoSiteSearch;
