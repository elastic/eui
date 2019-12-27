import React from 'react';

const EuiIconInvert = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M8 13.25a5.25 5.25 0 100-10.5 5.25 5.25 0 000 10.5zM8 14A6 6 0 118 2a6 6 0 010 12z" />
    <path d="M8 2a6 6 0 100 12V2z" />
  </svg>
);

export const icon = EuiIconInvert;
