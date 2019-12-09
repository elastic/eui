import React from 'react';

const EuiIconAppSecurityAnalytics = ({ title, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <g fill="none" fillRule="evenodd">
      <path
        className="euiIcon__fillNegative"
        fill="#535966"
        fillRule="nonzero"
        d="M10 12c5.43 0 9.848 4.327 9.996 9.72L20 22v1h-9v9h-1C4.477 32 0 27.523 0 22s4.477-10 10-10zm-1 9v-6.938a8.001 8.001 0 00-.25 15.84l.25.036V14.062 21zm2-6.938V21h6.938a8.005 8.005 0 00-6.68-6.902l-.257-.036z"
      />
      <path
        fill="#00BFB3"
        fillRule="nonzero"
        d="M26 22c0-8.837-7.163-16-16-16v2c7.732 0 14 6.268 14 14h2z"
      />
      <path
        fill="#00BFB3"
        fillRule="nonzero"
        d="M32 22C32 9.85 22.15 0 10 0v2c11.046 0 20 8.954 20 20h2z"
      />
    </g>
  </svg>
);

export const icon = EuiIconAppSecurityAnalytics;
