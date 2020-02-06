import React from 'react';

const EuiIconFolderClosed = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M6 2H1v11h14V3.5H7.125A1.125 1.125 0 016 2.375V2zm.25-1a.75.75 0 01.75.75v.625c0 .069.056.125.125.125H15a1 1 0 011 1V13a1 1 0 01-1 1H1a1 1 0 01-1-1V2a1 1 0 011-1h5.25z" />
  </svg>
);

export const icon = EuiIconFolderClosed;
