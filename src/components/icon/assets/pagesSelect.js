import React from 'react';

const EuiIconPagesSelect = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M3 1a1 1 0 011-1h8a1 1 0 01.707.293l2 2A1 1 0 0115 3v5.758a4.485 4.485 0 00-1-.502V4h-2a1 1 0 01-1-1V1H4v12h4.027c.039.347.117.682.23 1H4a1 1 0 01-1-1V1z" />
    <path d="M8.758 15H2V2a1 1 0 00-1 1v12a1 1 0 001 1h7.671a4.526 4.526 0 01-.913-1z" />
    <path
      fillRule="evenodd"
      d="M16 12.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zm-1.146-1.354a.5.5 0 010 .707l-2 2a.5.5 0 01-.708 0l-1-1a.5.5 0 01.708-.707l.646.647 1.646-1.647a.5.5 0 01.708 0z"
    />
  </svg>
);

export const icon = EuiIconPagesSelect;
