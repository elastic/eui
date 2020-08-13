import React from 'react';

const EuiIconRowsExpand = ({ title, titleId, ...props }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7.529 1.51L5.14 3.808a.677.677 0 01-.944 0 .65.65 0 010-.93l2.388-2.3a2.02 2.02 0 012.832 0l2.388 2.3a.65.65 0 010 .93.677.677 0 01-.944 0L8.47 1.51a.67.67 0 00-.942 0zM2.5 6a.5.5 0 000 1h11a.5.5 0 000-1h-11zm0 3a.5.5 0 000 1h11a.5.5 0 000-1h-11zm2.64 3.192l2.39 2.298a.67.67 0 00.942 0l2.389-2.298a.677.677 0 01.944 0 .65.65 0 010 .93l-2.388 2.3a2.02 2.02 0 01-2.832 0l-2.388-2.3a.65.65 0 010-.93.677.677 0 01.944 0z" />
  </svg>
);

export const icon = EuiIconRowsExpand;
