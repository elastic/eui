import * as React from 'react';

const EuiIconWrench = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M6.918 9.746l4.537 4.537a2 2 0 102.828-2.829l-3.157-3.156a.5.5 0 01.708-.708l3.156 3.157a3 3 0 11-4.243 4.243l-4.949-4.95a5.001 5.001 0 01-5.22-7.106.5.5 0 01.805-.138L3.676 5.09a1 1 0 101.415-1.414L2.797 1.382a.5.5 0 01.138-.805 5.001 5.001 0 113.983 9.169zM1.226 4.054a4.002 4.002 0 006.693 3.865 4 4 0 00-3.865-6.693l1.744 1.743a2 2 0 11-2.829 2.828L1.226 4.054zm10.229 8.814a1 1 0 111.414-1.414 1 1 0 01-1.414 1.414z" />
  </svg>
);

export const icon = EuiIconWrench;
