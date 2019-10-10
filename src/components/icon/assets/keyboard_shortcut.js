import React from 'react';

const EuiIconKeyboardShortcut = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 1h14v5H1V1zM0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm2 3h6v1H2V4zm1 6H2v2H0v1h2v2h1v-2h2v-1H3v-2zm11 3H8v1h6v-1zm1-3H7v5h8v-5zM7 9a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H7z"
      fill="#333"
    />
  </svg>
);

export const icon = EuiIconKeyboardShortcut;
