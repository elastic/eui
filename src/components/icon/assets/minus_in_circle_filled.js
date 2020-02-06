import React from 'react';

const EuiIconMinusInCircleFilled = ({ title, titleId, ...props }) => (
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
      d="M7.5 0C11.636 0 15 3.364 15 7.5S11.636 15 7.5 15 0 11.636 0 7.5 3.364 0 7.5 0zm-4 7a.5.5 0 000 1h8a.5.5 0 100-1h-8z"
    />
  </svg>
);

export const icon = EuiIconMinusInCircleFilled;
