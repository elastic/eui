import React from 'react';

const EuiIconLogoBeats = props => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      fill="#0080D5"
      d="M15 20H4V0h11c5.522 0 10 4.478 10 10s-4.478 10-10 10"
    />
    <path
      fill="#00C2B3"
      d="M26.702 15.624C24.6 19.979 20.152 23 15 23H4v9h15c5.522 0 10-4.478 10-10a9.952 9.952 0 0 0-2.298-6.376"
    />
    <path
      className="euiIcon__fillNegative"
      d="M24.338 13.554A9.942 9.942 0 0 0 19 12H4v8h11c4.27 0 7.903-2.68 9.338-6.446"
    />
  </svg>
);

export const icon = EuiIconLogoBeats;
