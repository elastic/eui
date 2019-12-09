import React from 'react';

const EuiIconKqlSelector = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M5 12a4 4 0 100-8 4 4 0 000 8zm0 1A5 5 0 115 3a5 5 0 010 10zm6-1a4 4 0 100-8 4 4 0 000 8zm0 1a5 5 0 110-10 5 5 0 010 10z" />
  </svg>
);

export const icon = EuiIconKqlSelector;
