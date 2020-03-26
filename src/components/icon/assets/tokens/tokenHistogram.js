import React from 'react';

const EuiIconTokenHistogram = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.5 3H7V7H9V4.5H12.5V12H13V13H3.00148V12H3.5V3ZM5.99999 4H4.49999V12H5.99999V4ZM9 8H6.99999V12H9V8ZM10 5.5H11.5V12H10V5.5Z"
    />
  </svg>
);

export const icon = EuiIconTokenHistogram;
