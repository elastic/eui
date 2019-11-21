import React from 'react';

const EuiIconTokenNull = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M5.002 12.412l-.962.962a1 1 0 01-1.414-1.414l.962-.962a5.333 5.333 0 017.41-7.41l.962-.962a1 1 0 111.414 1.414l-.962.962a5.333 5.333 0 01-7.41 7.41zm.966-.966a4 4 0 005.478-5.478l-5.478 5.478zm-1.414-1.414l5.478-5.478a4 4 0 00-5.478 5.478z" />
  </svg>
);

export const icon = EuiIconTokenNull;
