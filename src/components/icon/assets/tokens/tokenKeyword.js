import * as React from 'react';

const EuiIconTokenKeyword = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M5.75 7.375a.25.25 0 00-.25.25v.75c0 .138.112.25.25.25h3.5a.25.25 0 00.25-.25v-.75a.25.25 0 00-.25-.25h-3.5z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 5a1 1 0 011-1h5.989a1 1 0 01.825.436l2.05 3a1 1 0 010 1.128l-2.05 3A1 1 0 019.99 12H4a1 1 0 01-1-1V5zm1.25.75a.5.5 0 01.5-.5h4.745a.5.5 0 01.405.206l1.636 2.25a.5.5 0 010 .588L9.9 10.544a.5.5 0 01-.405.206H4.75a.5.5 0 01-.5-.5v-4.5z"
    />
  </svg>
);

export const icon = EuiIconTokenKeyword;
