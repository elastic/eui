import * as React from 'react';

const EuiIconContinuityAbove = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M1.5 3a.5.5 0 00-.5.5v9a.5.5 0 001 0v-9a.5.5 0 00-.5-.5zm3 0a.5.5 0 00-.5.5v9a.5.5 0 001 0V9h6v1.5a.5.5 0 00.82.384l3-2.5a.5.5 0 000-.768l-3-2.5A.5.5 0 0011 5.5V7H5V3.5a.5.5 0 00-.5-.5z" />
  </svg>
);

export const icon = EuiIconContinuityAbove;
