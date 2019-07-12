import React from 'react';

const EuiIconLogoCode = props => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      className="euiIcon__fillNegative"
      d="M9.75 12L16 32h10l-3.4-10.88A13 13 0 0 0 10.19 12h-.44z"
    />
    <path
      fill="#22A7F3"
      d="M25.725 11.93A17 17 0 0 0 9.5 0H6l3.75 12h.44a13 13 0 0 1 12.41 9.12L26 32h6l-6.275-20.07z"
    />
    <path fill="#0377CA" d="M7.91 16.175L0 32h12.855z" />
  </svg>
);

export const icon = EuiIconLogoCode;
