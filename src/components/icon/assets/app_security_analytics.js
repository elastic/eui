import React from 'react';

const EuiIconAppSecurityAnalytics = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    {...props}>
    <g transform="translate(2)">
      <path d="M0 14L28 14 28 30C24.6666667 31.3333333 20 32 14 32 8 32 3.33333333 31.3333333 0 30L0 14zM2 16L2 28.5886183C4.97237624 29.5204478 8.9791577 30 14 30 19.0208423 30 23.0276238 29.5204478 26 28.5886183L26 16 2 16zM22 12L22 8.09090909C22 3.62529113 18.421187 0 14 0 9.578813 0 6 3.62529113 6 8.09090909L6 12 8 12 8 8.09090909C8 4.72412514 10.6892005 2 14 2 17.3107995 2 20 4.72412514 20 8.09090909L20 12 22 12z" />
      <polygon
        className="euiIcon__fillSecondary"
        points="6 18 6 24 8 24 8 18"
      />
      <polygon
        className="euiIcon__fillSecondary"
        points="20 18 20 24 22 24 22 18"
      />
      <polygon
        className="euiIcon__fillSecondary"
        points="13 18 13 26 15 26 15 18"
      />
    </g>
  </svg>
);

export const icon = EuiIconAppSecurityAnalytics;
