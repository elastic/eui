import React from 'react';

const EuiIconAppApm = props => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path className="euiIcon__fillSecondary" d="M7 9v2H0V0h23v7h-2V2H2v7z" />
    <path d="M32 9v12H20c-6.075 0-11-4.925-11-11V9h23zm-20.945 2c.497 4.5 4.312 8 8.945 8h10v-8H11.055z" />
    <path className="euiIcon__fillSecondary" d="M30 23h2v9H19v-9h2v7h9z" />
  </svg>
);

export const icon = EuiIconAppApm;
