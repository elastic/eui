import * as React from 'react';

const EuiIconAppDashboard = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M29 9H3a3 3 0 01-3-3V3a3 3 0 013-3h26a3 3 0 013 3v3a3 3 0 01-3 3zM3 2a1 1 0 00-1 1v3a1 1 0 001 1h26a1 1 0 001-1V3a1 1 0 00-1-1H3z" />
    <path
      className="euiIcon__fillSecondary"
      d="M12 20H3a3 3 0 01-3-3v-3a3 3 0 013-3h9a3 3 0 013 3v3a3 3 0 01-3 3zm-9-7a1 1 0 00-1 1v3a1 1 0 001 1h9a1 1 0 001-1v-3a1 1 0 00-1-1H3z"
    />
    <path d="M12 31H3a3 3 0 01-3-3v-3a3 3 0 013-3h9a3 3 0 013 3v3a3 3 0 01-3 3zm-9-7a1 1 0 00-1 1v3a1 1 0 001 1h9a1 1 0 001-1v-3a1 1 0 00-1-1H3z" />
    <path
      className="euiIcon__fillSecondary"
      d="M29 31h-9a3 3 0 01-3-3V14a3 3 0 013-3h9a3 3 0 013 3v14a3 3 0 01-3 3zm-9-18a1 1 0 00-1 1v14a1 1 0 001 1h9a1 1 0 001-1V14a1 1 0 00-1-1h-9z"
    />
  </svg>
);

export const icon = EuiIconAppDashboard;
