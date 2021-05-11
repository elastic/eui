import * as React from 'react';

const EuiIconContinuityBelow = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M11.5 3a.5.5 0 01.5.5v9a.5.5 0 01-1 0V9H5v1.5a.5.5 0 01-.82.384l-3-2.5a.5.5 0 010-.768l3-2.5A.5.5 0 015 5.5V7h6V3.5a.5.5 0 01.5-.5zm3 0a.5.5 0 01.5.5v9a.5.5 0 01-1 0v-9a.5.5 0 01.5-.5z" />
  </svg>
);

export const icon = EuiIconContinuityBelow;
