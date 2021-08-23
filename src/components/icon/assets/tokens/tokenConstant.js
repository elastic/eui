import * as React from 'react';

const EuiIconTokenConstant = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M9.414 3.757l2.829 2.829a2 2 0 010 2.828l-2.829 2.829a2 2 0 01-2.828 0L3.757 9.414a2 2 0 010-2.828l2.829-2.829a2 2 0 012.828 0zm-1.747 2.91a1 1 0 00-1 1v.666a1 1 0 001 1h.666a1 1 0 001-1v-.666a1 1 0 00-1-1h-.666z"
    />
  </svg>
);

export const icon = EuiIconTokenConstant;
