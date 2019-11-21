import React from 'react';

const EuiIconFolderOpen = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M1 9.5l.826-3.717A1 1 0 012.802 5H13V3.5H7.125A1.125 1.125 0 016 2.375V2H1v7.5zm.247 3.5h11.95l1.556-7H2.803l-1.556 7zM13 14H1a1 1 0 01-1-1V2a1 1 0 011-1h5.25a.75.75 0 01.75.75v.625c0 .069.056.125.125.125H13a1 1 0 011 1V5h.753a1 1 0 01.977 1.217l-1.556 7a1 1 0 01-.976.783H13z" />
  </svg>
);

export const icon = EuiIconFolderOpen;
