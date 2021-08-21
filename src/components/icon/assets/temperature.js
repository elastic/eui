import * as React from 'react';

const EuiIconTemperature = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8.5 15a3.5 3.5 0 01-1.75-6.532L7 8.324V2.5A1.496 1.496 0 019.908 2H8.5v1H10v1H8.5v1H10v1H8.5v1H10v1.324l.25.144A3.5 3.5 0 018.5 15M11 7.758V2.5a2.5 2.5 0 10-5 0v5.258a4.5 4.5 0 105 0" />
    <path d="M8.5 9a2.5 2.5 0 110 5 2.5 2.5 0 010-5" />
  </svg>
);

export const icon = EuiIconTemperature;
