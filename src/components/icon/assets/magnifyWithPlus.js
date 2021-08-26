import * as React from 'react';

const EuiIconMagnifyWithPlus = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7 6h2.5a.5.5 0 010 1H7v2.5a.5.5 0 01-1 0V7H3.5a.5.5 0 010-1H6V3.5a.5.5 0 011 0V6zm3.24 4.74c0-.117.04-.225.107-.31A5.478 5.478 0 0012 6.5 5.5 5.5 0 106.5 12a.5.5 0 110 1 6.5 6.5 0 114.936-2.27l4.419 4.418a.5.5 0 01-.707.707l-4.768-4.768a.499.499 0 01-.14-.347z" />
  </svg>
);

export const icon = EuiIconMagnifyWithPlus;
