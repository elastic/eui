import * as React from 'react';

const EuiIconLogoSecurity = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M9 7.008V0h20v16.744c0 3.913-6.378 6.477-9.015 7.256V7.008H9z"
      fill="#FA744E"
    />
    <path
      d="M3 20.073V10h14v22C7.667 27.98 3 24.004 3 20.073z"
      fill="#1DBAB0"
    />
    <path
      d="M9 10h8v14c-2.983-1.14-8-3.756-8-7.043V10z"
      className="euiIcon__fillNegative"
    />
  </svg>
);

export const icon = EuiIconLogoSecurity;
