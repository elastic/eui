import React from 'react';

const EuiIconAppDiscover = props => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      className="euiIcon__fillSecondary"
      d="M8.33 23.67l4.79-10.55 10.55-4.79-4.79 10.55-10.55 4.79zm6.3-9l-2.28 5 5-2.28 2.28-5-5 2.28z"
    />
    <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16A16 16 0 0 0 16 0zm1 29.95V28h-2v1.95A14 14 0 0 1 2.05 17H4v-2H2.05A14 14 0 0 1 15 2.05V4h2V2.05A14 14 0 0 1 29.95 15H28v2h1.95A14 14 0 0 1 17 29.95z" />
  </svg>
);

export const icon = EuiIconAppDiscover;
