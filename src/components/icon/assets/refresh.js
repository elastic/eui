import * as React from 'react';

const EuiIconRefresh = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M11.228 2.942a.5.5 0 11-.538.842A5 5 0 1013 8a.5.5 0 111 0 6 6 0 11-2.772-5.058zM14 1.5v3A1.5 1.5 0 0112.5 6h-3a.5.5 0 010-1h3a.5.5 0 00.5-.5v-3a.5.5 0 111 0z" />
  </svg>
);

export const icon = EuiIconRefresh;
