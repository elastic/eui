import * as React from 'react';

const EuiIconTokenPercolator = ({ title, titleId, ...props }) => (
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
      clipRule="evenodd"
      d="M5.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0 1a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM11 9a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4zm-2.5 1.5a.5.5 0 11-1 0 .5.5 0 011 0zm1 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
    />
  </svg>
);

export const icon = EuiIconTokenPercolator;
