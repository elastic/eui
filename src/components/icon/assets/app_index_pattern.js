import React from 'react';

const EuiIconAppIndexPattern = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M20 14h-8a3 3 0 01-3-3V3a3 3 0 013-3h8a3 3 0 013 3v8a3 3 0 01-3 3zM12 2a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1h-8zM17 18v-2h-2v2H3v6h2v-4h10v4h2v-4h10v4h2v-6z" />
    <path
      className="euiIcon__fillSecondary"
      d="M4 32a3 3 0 110-6 3 3 0 010 6zm0-4a1 1 0 100 2 1 1 0 000-2zm12 4a3 3 0 110-6 3 3 0 010 6zm0-4a1 1 0 100 2 1 1 0 000-2zm12 4a3 3 0 110-6 3 3 0 010 6zm0-4a1 1 0 100 2 1 1 0 000-2zM13 4h6v2h-6zM13 8h6v2h-6z"
    />
  </svg>
);

export const icon = EuiIconAppIndexPattern;
