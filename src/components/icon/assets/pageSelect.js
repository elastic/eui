import React from 'react';

const EuiIconPageSelect = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M3 1a1 1 0 00-1 1v12a1 1 0 001 1h5.758a4.485 4.485 0 01-.502-1H3V2h7v2a1 1 0 001 1h2v3.027c.347.039.682.117 1 .23V4a1 1 0 00-.293-.707l-2-2A1 1 0 0011 1H3z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 12.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zm-1.146-1.354a.5.5 0 010 .707l-2 2a.5.5 0 01-.708 0l-1-1a.5.5 0 01.708-.707l.646.647 1.646-1.647a.5.5 0 01.708 0z"
    />
  </svg>
);

export const icon = EuiIconPageSelect;
