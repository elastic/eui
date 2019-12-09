import React from 'react';

const EuiIconLogoSecurity = ({ title, ...props }) => (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>{title}</title>
    <g fill="none" fillRule="evenodd">
      <path
        d="M0 22c0 5.522 4.478 10 10 10V12C4.478 12 0 16.477 0 22"
        fill="#00BFB3"
      />
      <path d="M10 12v10h10c0-5.523-4.478-10-10-10" fill="#343741" />
      <path
        d="M10 0v9c7.168 0 13 5.831 13 13h9C32 9.85 22.15 0 10 0"
        fill="#F04E98"
      />
    </g>
  </svg>
);

export const icon = EuiIconLogoSecurity;
