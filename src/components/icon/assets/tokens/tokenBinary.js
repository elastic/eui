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
    <path fillRule="evenodd" d="M12 4H4V12H12V4ZM8.5 5.5H5.5V10.5H8.5V5.5Z" />
  </svg>
);

export const icon = EuiIconTokenBinary;
