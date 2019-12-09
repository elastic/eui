import React from 'react';

const EuiIconLogoApm = ({ title, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path fill="#F04E98" d="M0 0h32v10H0z" />
    <path
      className="euiIcon__fillNegative"
      d="M10 10h22a10 10 0 01-10 10H10V10z"
    />
    <path fill="#0080D5" d="M19 23h13v9H19z" />
  </svg>
);

export const icon = EuiIconLogoApm;
