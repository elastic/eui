import * as React from 'react';

const EuiIconTokenArray = ({ title, titleId, ...props }) => (
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
      d="M4.392 12V4h2.713v1.14h-1.21v5.72h1.21V12H4.392zm7.692-8v8H9.37v-1.14h1.209V5.14H9.37V4h2.714z"
    />
  </svg>
);

export const icon = EuiIconTokenArray;
