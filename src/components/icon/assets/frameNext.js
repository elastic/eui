import * as React from 'react';

const EuiIconFrameNext = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M3 2a1 1 0 00-1 1v10a1 1 0 102 0V3a1 1 0 00-1-1zm5.146.22l7.2 4.581a1.425 1.425 0 010 2.398l-7.2 4.581C7.21 14.375 6 13.692 6 12.581V3.42c0-1.112 1.21-1.795 2.146-1.2z"
      clipRule="evenodd"
    />
  </svg>
);

export const icon = EuiIconFrameNext;
