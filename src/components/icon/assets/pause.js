import * as React from 'react';

const EuiIconPause = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M5 2a1 1 0 00-1 1v10a1 1 0 102 0V3a1 1 0 00-1-1zm6 0a1 1 0 00-1 1v10a1 1 0 102 0V3a1 1 0 00-1-1z" />
  </svg>
);

export const icon = EuiIconPause;
