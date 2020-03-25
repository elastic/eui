import React from 'react';

const EuiIconTokenBinary = ({ title, titleId, ...props }) => (
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
      d="M2 3.5H8H14V12.5H8H2V3.5ZM8 11.5V4.5H3V11.5H8Z"
    />
  </svg>
);

export const icon = EuiIconTokenBinary;
