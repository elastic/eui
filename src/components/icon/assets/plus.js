import * as React from 'react';

const EuiIconPlus = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7.5 3a.5.5 0 01.5.5V7h3.5a.5.5 0 110 1H8v3.5a.5.5 0 11-1 0V8H3.5a.5.5 0 010-1H7V3.5a.5.5 0 01.5-.5z" />
  </svg>
);

export const icon = EuiIconPlus;
