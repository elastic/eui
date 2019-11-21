import React from 'react';

const EuiIconSymlink = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path
      clipRule="evenodd"
      d="M10.8 0H2a1 1 0 00-1 1v8l1-1V1h8v3.5a.5.5 0 00.5.5H14v10H2v-1a3.5 3.5 0 013.5-3.5H8V13l3-3-3-3v2.5H5.5A4.5 4.5 0 001 14v1a1 1 0 001 1h12a1 1 0 001-1V4.429c0-.256-.098-.503-.274-.689l-3.2-3.428A1.002 1.002 0 0010.8 0z"
    />
  </svg>
);

export const icon = EuiIconSymlink;
