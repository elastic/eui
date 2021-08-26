import * as React from 'react';

const EuiIconTokenEnum = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M5.211 12V4h5.578v1.57H7.145v1.641h3.359v1.574H7.145v1.645h3.644V12z"
    />
  </svg>
);

export const icon = EuiIconTokenEnum;
