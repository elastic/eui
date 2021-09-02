import * as React from 'react';

const EuiIconTokenDenseVector = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M4.154 12V4h2.713v1.14H5.658v5.72h1.21V12H4.153zm7.692-8v8H9.133v-1.14h1.209V5.14h-1.21V4h2.714z" />
  </svg>
);

export const icon = EuiIconTokenDenseVector;
