import * as React from 'react';

const EuiIconVisBarHorizontalStacked = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M.5 0a.5.5 0 01.5.5v14a.5.5 0 11-1 0V.5A.5.5 0 01.5 0zm13 1a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H9v3h2.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5h-9a.5.5 0 110-1H9v-3H2.5a.5.5 0 010-1H6V6H2.5a.5.5 0 010-1H10V2H2.5a.5.5 0 010-1h11z" />
  </svg>
);

export const icon = EuiIconVisBarHorizontalStacked;
