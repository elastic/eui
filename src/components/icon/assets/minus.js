import * as React from 'react';

const EuiIconMinus = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <rect width={10} height={1.5} x={3} y={7.25} rx={0.5} />
  </svg>
);

export const icon = EuiIconMinus;
