import * as React from 'react';

const EuiIconLogoWorkplaceSearch = ({ title, titleId, ...props }) => (
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
      d="M17.557 5.05c.17-.202.457-.512.86-.93C19.483 3.017 21.828 1 23.801 1H30v30h-6.2c-1.972 0-3.995-1.449-5.383-3.106l-.764-1.052 2.75-3.477c3.462-4.376 3.463-10.332.001-14.707L17.557 5.05z"
      fill="#FEC514"
    />
    <path
      d="M2 31V1h5.81c1.71 0 3.35.786 4.387 2.1l5.855 7.42c2.598 3.283 2.598 7.698-.002 10.983l-5.855 7.403C11.158 30.217 9.52 31 7.815 31H2z"
      fill="#F04E98"
    />
    <path
      d="M15.384 24.89L12.15 21.7c-2.868-3.318-2.868-8.22.002-11.322 1.535-1.639 2.611-2.718 3.23-3.238l2.67 3.238c2.637 3.385 2.575 7.987-.062 11.374l-2.607 3.137z"
      className="euiIcon__fillNegative"
    />
  </svg>
);

export const icon = EuiIconLogoWorkplaceSearch;
