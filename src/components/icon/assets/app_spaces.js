import React from 'react';

const EuiIconAppSpaces = props => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      className="euiIcon__fillSecondary"
      d="M4 4h6v2H4zM22 4h6v2h-6zM4 22h6v2H4z"
    />
    <path d="M0 14h14V0H0v14zM2 2h10v10H2V2zm16-2v14h14V0H18zm12 12H20V2h10v10zM0 32h14V18H0v14zm2-12h10v10H2V20zm16 12h14V18H18v14zm2-12h10v10H20V20z" />
    <path className="euiIcon__fillSecondary" d="M22 22h6v2h-6z" />
  </svg>
);

export const icon = EuiIconAppSpaces;
