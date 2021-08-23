import * as React from 'react';

const EuiIconHome = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8.13 1.229l5.5 4.47a1 1 0 01.37.777V14a1 1 0 01-1 1H2a1 1 0 01-1-1V6.476a1 1 0 01.37-.776l5.5-4.471a1 1 0 011.26 0zM13 6.476L7.5 2.005 2 6.475V14h11V6.476z" />
  </svg>
);

export const icon = EuiIconHome;
