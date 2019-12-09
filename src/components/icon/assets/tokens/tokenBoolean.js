import React from 'react';

const EuiIconTokenBoolean = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M4.936 11.064l6.128-6.128a4.333 4.333 0 10-6.128 6.128zM8 13A5 5 0 118 3a5 5 0 010 10z" />
  </svg>
);

export const icon = EuiIconTokenBoolean;
