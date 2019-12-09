import React from 'react';

const EuiIconMlDataVisualizer = ({ title, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path
      className="euiIcon__fillSecondary"
      d="M23 12.05V13a10 10 0 01-.11 1.44 6 6 0 11-8.45 8.45A10 10 0 0113 23h-.95A8 8 0 1023 12.05z"
    />
    <path d="M0 11h2V2h9V0H0zM21 0v2h9v9h2V0zM2 21H0v11h11v-2H2zM30 30h-9v2h11V21h-2zM13 21a8 8 0 110-16 8 8 0 010 16zm0-14a6 6 0 100 12 6 6 0 000-12z" />
  </svg>
);

export const icon = EuiIconMlDataVisualizer;
