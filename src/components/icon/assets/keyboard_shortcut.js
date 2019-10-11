import React from 'react';

const EuiIconKeyboardShortcut = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path d="M15 9a1 1 0 0 1 .993.883L16 10v5a1 1 0 0 1-.883.993L15 16H7a1 1 0 0 1-.993-.883L6 15v-5a1 1 0 0 1 .883-.993L7 9h8zM2.5 10a.5.5 0 0 1 .492.41L3 10.5V12h1.5a.5.5 0 0 1 .09.992L4.5 13H3v1.5a.5.5 0 0 1-.992.09L2 14.5V13H.5a.5.5 0 0 1-.09-.992L.5 12H2v-1.5a.5.5 0 0 1 .5-.5zM15 10H7v5h8v-5zm-1 3v1H8v-1h6zm1-13a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h14zm0 1H1v5h14V1zM8 4v1H2V4h6z" />
  </svg>
);

export const icon = EuiIconKeyboardShortcut;
