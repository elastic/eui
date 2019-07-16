import React from 'react';

const EuiIconAppSecurity = props => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path d="M14 32l-.36-.14A21.07 21.07 0 0 1 0 12.07V5.44L14 .06l14 5.38v6.63a21.07 21.07 0 0 1-13.64 19.78L14 32zM2 6.82v5.25a19.08 19.08 0 0 0 12 17.77 19.08 19.08 0 0 0 12-17.77V6.82L14 2.2 2 6.82z" />
    <path
      className="euiIcon__fillSecondary"
      d="M9 17.83h2V23H9zM11 10.18V7H9v3.18a3 3 0 1 0 2 0zM10 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM17 7h2v5.17h-2zM21 17a3 3 0 1 0-4 2.82V23h2v-3.18A3 3 0 0 0 21 17zm-3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
    />
  </svg>
);

export const icon = EuiIconAppSecurity;
