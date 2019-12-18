import React from 'react';

const EuiIconAnnotation = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M9 6.965a3.5 3.5 0 10-1 0V15.5a.5.5 0 001 0V6.965z" />
  </svg>
);

export const icon = EuiIconAnnotation;
