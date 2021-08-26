import * as React from 'react';

const EuiIconStopFilled = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <rect width={12} height={12} x={2} y={2} rx={2} fillRule="evenodd" />
  </svg>
);

export const icon = EuiIconStopFilled;
