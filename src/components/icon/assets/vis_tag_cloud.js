import * as React from 'react';

const EuiIconVisTagCloud = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M1.5 9.047a.5.5 0 100 1h13a.5.5 0 000-1h-13zm0-1h13a1.5 1.5 0 010 3h-13a1.5 1.5 0 010-3zM10 13a.5.5 0 110 1H4a.5.5 0 110-1h6zM8.001 2.015a.5.5 0 11-.002 1l-5-.015a.5.5 0 11.003-1l5 .015zM14 5a.5.5 0 110 1H6a.5.5 0 010-1h8z" />
  </svg>
);

export const icon = EuiIconVisTagCloud;
