import React from 'react';

const EuiIconRowsCollapse = ({ title, titleId, ...props }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M7.529 2.49L5.14.192a.677.677 0 00-.944 0 .65.65 0 000 .93l2.388 2.3a2.02 2.02 0 002.832 0l2.388-2.3a.65.65 0 000-.93.677.677 0 00-.944 0L8.47 2.49a.67.67 0 01-.942 0zM2.5 6a.5.5 0 000 1h11a.5.5 0 000-1h-11zm0 3a.5.5 0 000 1h11a.5.5 0 000-1h-11zm2.64 6.808l2.39-2.298a.67.67 0 01.942 0l2.389 2.298c.26.256.685.256.944 0a.65.65 0 000-.93l-2.388-2.3a2.02 2.02 0 00-2.832 0l-2.388 2.3a.65.65 0 000 .93c.26.256.683.256.944 0z"
    />
  </svg>
);

export const icon = EuiIconRowsCollapse;
