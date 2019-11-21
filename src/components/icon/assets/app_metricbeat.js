import React from 'react';

const EuiIconAppMetricbeat = ({ title, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16a16 16 0 01-16 16zm0-30C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14A14 14 0 0016 2z" />
    <path
      className="euiIcon__fillSecondary"
      d="M28 16h-2c0-5.523-4.477-10-10-10S6 10.477 6 16H4C4 9.373 9.373 4 16 4s12 5.373 12 12z"
    />
    <path d="M21.71 11.71L20.3 10.3 18 12.57a4 4 0 00-2-.57 4 4 0 104 4 4 4 0 00-.57-2l2.28-2.29zM16 18a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
);

export const icon = EuiIconAppMetricbeat;
