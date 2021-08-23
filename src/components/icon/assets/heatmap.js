import * as React from 'react';

const EuiIconHeatmap = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M12 9a3 3 0 110 6 3 3 0 010-6zm0 1a2 2 0 100 4 2 2 0 000-4zM4 2a2 2 0 110 4 2 2 0 010-4zm0 1a1 1 0 100 2 1 1 0 000-2zm0 5a4 4 0 110 8 4 4 0 010-8zm0 1a3 3 0 100 6 3 3 0 000-6zm8-9a4 4 0 110 8 4 4 0 010-8zm0 1a3 3 0 100 6 3 3 0 000-6z" />
  </svg>
);

export const icon = EuiIconHeatmap;
