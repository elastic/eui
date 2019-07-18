import React from 'react';

const EuiIconLogoSecurity = props => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      fill="#0080D5"
      d="M26 27.793a2.986 2.986 0 0 1-2.215 2.896C21.584 31.268 17.842 32 13 32c-4.842 0-8.584-.732-10.785-1.311A2.986 2.986 0 0 1 0 27.793V13h26v14.793z"
    />
    <path fill="#FEC514" d="M21 10H5V8a8 8 0 0 1 16 0v2z" />
    <path
      className="euiIcon__fillNegative"
      d="M21 18.793c0 .785-.453 1.499-1.169 1.82C18.521 21.201 16.16 22 13 22c-3.16 0-5.521-.799-6.831-1.387A1.988 1.988 0 0 1 5 18.793V13h16v5.793z"
    />
  </svg>
);

export const icon = EuiIconLogoSecurity;
