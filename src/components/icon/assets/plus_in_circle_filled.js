import React from 'react';

const EuiIconPlusInCircleFilled = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M8 7V3.5a.5.5 0 00-1 0V7H3.5a.5.5 0 000 1H7v3.5a.5.5 0 101 0V8h3.5a.5.5 0 100-1H8zm-.5 8a7.5 7.5 0 110-15 7.5 7.5 0 010 15z" />
  </svg>
);

export const icon = EuiIconPlusInCircleFilled;
