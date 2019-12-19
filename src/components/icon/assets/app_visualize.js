import React from 'react';

const EuiIconAppVisualize = ({ title, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path
      className="euiIcon__fillSecondary"
      d="M32 32H4a4 4 0 01-4-4V0h2v28a2 2 0 002 2h28v2z"
    />
    <path d="M6 20h2v7H6zM16 12h2v15h-2zM26 17h2v10h-2z" />
    <path d="M27 6a3 3 0 00-2.08.84L20 4.36A2.2 2.2 0 0020 4a3 3 0 00-6 0c.001.341.062.68.18 1l-5.6 4.46A3 3 0 007 9a3 3 0 103 3 2.93 2.93 0 00-.18-1l5.6-4.48A3 3 0 0017 7a3 3 0 002.08-.84l5 2.48A2.2 2.2 0 0024 9a3 3 0 103-3zM7 13a1 1 0 110-2 1 1 0 010 2zm10-8a1 1 0 110-2 1 1 0 010 2zm10 5a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);

export const icon = EuiIconAppVisualize;
