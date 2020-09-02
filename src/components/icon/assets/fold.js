import React from 'react';

const EuiIconFold = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7.529 2.49L5.14.192a.677.677 0 00-.944 0 .65.65 0 000 .93l2.388 2.3a2.02 2.02 0 002.832 0l2.388-2.3a.65.65 0 000-.93.677.677 0 00-.944 0L8.47 2.49a.67.67 0 01-.942 0zM7.529 13.51L5.14 15.808a.677.677 0 01-.944 0 .65.65 0 010-.93l2.388-2.3a2.02 2.02 0 012.832 0l2.388 2.3a.65.65 0 010 .93.677.677 0 01-.944 0L8.47 13.51a.67.67 0 00-.942 0zM0 6h16v4H0V6zm1 1h14v2H1V7z" />
  </svg>
);

export const icon = EuiIconFold;
