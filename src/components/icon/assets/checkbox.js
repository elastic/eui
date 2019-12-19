import React from 'react';

const EuiIconCheckbox = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M11.854 5.854a.5.5 0 00-.708-.708L6.5 9.793 4.854 8.146a.5.5 0 10-.708.708l2 2a.5.5 0 00.708 0l5-5z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5 2h-9A1.5 1.5 0 002 3.5v9A1.5 1.5 0 003.5 14h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0012.5 2zM3 3.5a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5v-9z"
    />
  </svg>
);

export const icon = EuiIconCheckbox;
