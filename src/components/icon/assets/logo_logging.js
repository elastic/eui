import React from 'react';

const EuiIconLogoLogging = props => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path fill="#0080D5" d="M0 10v13a9 9 0 0 1 9 9h13c0-12.15-9.85-22-22-22" />
    <path
      className="euiIcon__fillNegative"
      d="M12 13.565V32h10c0-7.722-3.981-14.51-10-18.436"
    />
    <path
      fill="#00BFB3"
      d="M12 0v10.226C19.666 14.468 24.869 22.636 24.869 32H28V16c0-8.837-7.163-16-16-16"
    />
  </svg>
);

export const icon = EuiIconLogoLogging;
