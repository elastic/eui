import React from 'react';

const EuiIconDocument = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M10.8 0H2a1 1 0 00-1 1v14a1 1 0 001 1h12a1 1 0 001-1V4.429c0-.256-.098-.503-.274-.689l-3.2-3.428A1.002 1.002 0 0010.8 0M14 5v10H2V1h8v3.5a.5.5 0 00.5.5H14z" />
  </svg>
);

export const icon = EuiIconDocument;
