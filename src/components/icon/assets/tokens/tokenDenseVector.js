import React from 'react';

const EuiIconTokenDenseVector = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M4.1539 12V4H6.86711V5.13923H5.65807V10.8608H6.86711V12H4.1539ZM11.8461 4V12H9.13288V10.8608H10.3419V5.13923H9.13288V4H11.8461Z"
    />
  </svg>
);

export const icon = EuiIconTokenDenseVector;
