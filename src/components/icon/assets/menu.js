import * as React from 'react';

const EuiIconMenu = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M0 2h16v2H0V2zm0 5h16v2H0V7zm16 5H0v2h16v-2z" />
  </svg>
);

export const icon = EuiIconMenu;
