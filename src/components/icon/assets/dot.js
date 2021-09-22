// THIS IS A GENERATED FILE. DO NOT MODIFY MANUALLY

import * as React from 'react';

const EuiIconDot = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <circle cx={8} cy={8} r={4} />
  </svg>
);

export const icon = EuiIconDot;
