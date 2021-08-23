import * as React from 'react';

const EuiIconAppFilebeat = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      className="euiIcon__fillSecondary"
      d="M8 18h16v2H8zM8 13h9v2H8zM8 23h16v2H8z"
    />
    <path d="M21.41 0H5a3 3 0 00-3 3v26a3 3 0 003 3h22a3 3 0 003-3V8.59L21.41 0zM22 3.41L26.59 8H22V3.41zM27 30H5a1 1 0 01-1-1V3a1 1 0 011-1h15v8h8v19a1 1 0 01-1 1z" />
  </svg>
);

export const icon = EuiIconAppFilebeat;
