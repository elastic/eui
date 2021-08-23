import * as React from 'react';

const EuiIconTokenSearchType = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M6.27 7.5a1 1 0 112 0 1 1 0 01-2 0zM8.77 7.5a1 1 0 112 0 1 1 0 01-2 0z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.702 10.682a4.501 4.501 0 01-5.796.482L4.28 12.789a.75.75 0 01-1.06-1.06L4.847 10.1a4.501 4.501 0 116.855.581zm-5.304-1.06a3 3 0 104.243-4.243A3 3 0 006.398 9.62z"
    />
  </svg>
);

export const icon = EuiIconTokenSearchType;
