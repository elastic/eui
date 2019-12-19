import React from 'react';

const EuiIconCheckboxMultiple = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M12.854 4.854a.5.5 0 00-.708-.708L7.5 8.793 5.854 7.146a.5.5 0 10-.708.708l2 2a.5.5 0 00.708 0l5-5z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.5 1h9A1.5 1.5 0 0115 2.5v9a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 013 11.5v-9A1.5 1.5 0 014.5 1zm0 1a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5h-9z"
    />
    <path d="M2 3.085A1.5 1.5 0 001 4.5v9A1.5 1.5 0 002.5 15h9a1.5 1.5 0 001.415-1H2.5a.5.5 0 01-.5-.5V3.085z" />
  </svg>
);

export const icon = EuiIconCheckboxMultiple;
