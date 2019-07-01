import React from 'react';

const EuiIconAppApm = props => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path d="M3 10h4v2H1V1h30v6h-2V3H3v7zm26 19v-6h2v8H18v-8h2v6h9z" />
    <path
      className="euiIcon__fillSecondary"
      d="M31 10H9v11h12c5.523 0 10-4.477 10-10v-1zm-10 9H11v-7h17.938A8.001 8.001 0 0 1 21 19z"
    />
  </svg>
);

export const icon = EuiIconAppApm;
