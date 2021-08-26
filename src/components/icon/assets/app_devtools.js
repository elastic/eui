import * as React from 'react';

const EuiIconAppDevtools = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M21 28h-2v-8.49l.6-.26A9 9 0 0021 3.52V11H11V3.52a9 9 0 001.4 15.73l.6.26V28h-2v-7.21A11 11 0 0111.6.92L13 .31V9h6V.31l1.4.61a11 11 0 01.6 19.87V28z" />
    <path className="euiIcon__fillSecondary" d="M11 30h10v2H11z" />
  </svg>
);

export const icon = EuiIconAppDevtools;
