import * as React from 'react';

const EuiIconTokenBinary = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path fillRule="evenodd" d="M12 4H4v8h8V4zM8.5 5.5h-3v5h3v-5z" />
  </svg>
);

export const icon = EuiIconTokenBinary;
