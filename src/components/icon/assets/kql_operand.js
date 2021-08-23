import * as React from 'react';

const EuiIconKqlOperand = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M11.192 10.145l2.298-1.792c.259-.196.259-.509 0-.706l-2.298-1.792c-.256-.196-.256-.513 0-.708a.81.81 0 01.93 0l2.3 1.791c.772.59.77 1.537 0 2.124l-2.3 1.791a.81.81 0 01-.93 0c-.256-.195-.256-.512 0-.708zm-6.384-4.29L2.51 7.647c-.259.196-.259.509 0 .706l2.298 1.792c.256.196.256.513 0 .708a.81.81 0 01-.93 0l-2.3-1.791c-.772-.59-.77-1.537 0-2.124l2.3-1.791a.81.81 0 01.93 0c.256.195.256.512 0 .708zM6.5 6h3a.5.5 0 010 1h-3a.5.5 0 010-1zm0 3h3a.5.5 0 010 1h-3a.5.5 0 010-1z" />
  </svg>
);

export const icon = EuiIconKqlOperand;
