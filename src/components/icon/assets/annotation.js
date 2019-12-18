import React from 'react';

const EuiIconAnnotation = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M3 6.5a4.5 4.5 0 115 4.473V16H7v-5.027A4.5 4.5 0 013 6.5z" />
  </svg>
);

export const icon = EuiIconAnnotation;
