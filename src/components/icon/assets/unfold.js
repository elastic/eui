import React from 'react';

const EuiIconUnfold = ({ title, titleId, ...props }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7.529 1.51L5.14 3.808a.677.677 0 01-.944 0 .65.65 0 010-.93l2.388-2.3a2.02 2.02 0 012.832 0l2.388 2.3a.65.65 0 010 .93.677.677 0 01-.944 0L8.47 1.51a.67.67 0 00-.942 0zm0 12.98L5.14 12.192a.677.677 0 00-.944 0 .65.65 0 000 .93l2.388 2.3a2.02 2.02 0 002.832 0l2.388-2.3a.65.65 0 000-.93.677.677 0 00-.944 0L8.47 14.49a.67.67 0 01-.942 0z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 6h16v4H0V6zm1 1h14v2H1V7z"
    />
  </svg>
);

export const icon = EuiIconUnfold;
