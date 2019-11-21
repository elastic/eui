import React from 'react';

const EuiIconLogoAppSearch = ({ title, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path
      fill="#0080D5"
      d="M19.5.938a7.002 7.002 0 00-7 0l-8 4.619A7 7 0 001 11.62v9.237a7 7 0 003.5 6.062l7.5 4.33V17.979a7 7 0 013.5-6.062L27 5.276 19.5.939z"
    />
    <path
      className="euiIcon__fillNegative"
      d="M19.5.938a7.002 7.002 0 00-7 0L5 5.277l11 6.35 11-6.35-7.5-4.34z"
    />
    <path
      fill="#FA744E"
      d="M28.435 7.76l-10.026 5.79a6.994 6.994 0 011.59 4.428v13.27l7.5-4.33a7 7 0 003.5-6.061v-9.238a6.992 6.992 0 00-1.586-4.422l-.978.564z"
    />
  </svg>
);

export const icon = EuiIconLogoAppSearch;
