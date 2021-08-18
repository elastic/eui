import * as React from 'react';

const EuiIconBranch = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M5 10.038a3.49 3.49 0 012.5-1.05h2a2.5 2.5 0 002.462-2.061 2 2 0 111.008.017A3.5 3.5 0 019.5 9.987h-2a2.5 2.5 0 00-2.466 2.085A2 2 0 114 12.063V3.937a2 2 0 111 0v6.1zM4.5 3a1 1 0 100-2 1 1 0 000 2zm0 12a1 1 0 100-2 1 1 0 000 2zm8-9a1 1 0 100-2 1 1 0 000 2z" />
  </svg>
);

export const icon = EuiIconBranch;
