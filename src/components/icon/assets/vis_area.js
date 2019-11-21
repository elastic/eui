import React from 'react';

const EuiIconVisArea = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M3 13h10V9.913l-2.571-2.826L8.56 8.753a.5.5 0 01-.728-.067L4.448 4.317 3 6.191V13zm5.295-5.35l1.837-1.64a.5.5 0 01.703.037l3.035 3.336a.5.5 0 01.13.337v3.78a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5V6.02a.5.5 0 01.104-.305l1.947-2.52a.5.5 0 01.791-.001L8.295 7.65zM1 15h13.5a.5.5 0 110 1H.5a.5.5 0 01-.5-.5v-14a.5.5 0 011 0V15z" />
  </svg>
);

export const icon = EuiIconVisArea;
