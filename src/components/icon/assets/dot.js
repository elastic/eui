import React from 'react';

const EuiIconDot = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <circle cx={8} cy={8} r={4} />
  </svg>
);

export const icon = EuiIconDot;
