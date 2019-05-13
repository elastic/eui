import React from 'react';

const EuiIconMlDataVisualizer = props => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      className="euiIcon__fillSecondary"
      d="M23 12.05V13a10 10 0 0 1-.11 1.44 6 6 0 1 1-8.45 8.45A10 10 0 0 1 13 23h-.95A8 8 0 1 0 23 12.05z"
    />
    <path d="M0 11h2V2h9V0H0zM21 0v2h9v9h2V0zM2 21H0v11h11v-2H2zM30 30h-9v2h11V21h-2zM13 21a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-14a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
  </svg>
);

export const icon = EuiIconMlDataVisualizer;
