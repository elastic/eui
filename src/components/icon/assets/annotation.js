import React from 'react';

const EuiIconAnnotation = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M7.5 2a4.5 4.5 0 00-.5 8.973V15.5a.5.5 0 001 0v-4.527A4.5 4.5 0 007.5 2z" />
  </svg>
);

export const icon = EuiIconAnnotation;
