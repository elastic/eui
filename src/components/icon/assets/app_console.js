import React from 'react';

const EuiIconAppConsole = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M29 9H3a3 3 0 01-3-3V3a3 3 0 013-3h26a3 3 0 013 3v3a3 3 0 01-3 3zM3 2a1 1 0 00-1 1v3a1 1 0 001 1h26a1 1 0 001-1V3a1 1 0 00-1-1H3z" />
    <path
      className="euiIcon__fillSecondary"
      d="M29 32H3a3 3 0 01-3-3V14a3 3 0 013-3h26a3 3 0 013 3v15a3 3 0 01-3 3zM3 13a1 1 0 00-1 1v15a1 1 0 001 1h26a1 1 0 001-1V14a1 1 0 00-1-1H3z"
    />
    <path d="M7.29 17.71l3.3 3.29-3.3 3.29 1.42 1.42 4.7-4.71-4.7-4.71zM15 24h9v2h-9z" />
  </svg>
);

export const icon = EuiIconAppConsole;
