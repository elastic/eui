// THIS IS A GENERATED FILE. DO NOT MODIFY MANUALLY

import * as React from 'react';

const EuiIconSwatchInput = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <rect x={2} y={2} width={12} height={12} rx={3} />
    <rect
      className="euiSwatchInput__stroke"
      x={2.5}
      y={2.5}
      width={11}
      height={11}
      rx={2}
    />
  </svg>
);

export const icon = EuiIconSwatchInput;
