import React from 'react';

const EuiIconVisControls = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M8.05 10a2.5 2.5 0 014.9 0H15v1h-2.05a2.5 2.5 0 01-4.9 0H1v-1h7.05zm-.1-4a2.5 2.5 0 01-4.9 0H1V5h2.05a2.5 2.5 0 014.9 0H15v1H7.95zM4 5.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm8 5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
  </svg>
);

export const icon = EuiIconVisControls;
