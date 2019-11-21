import React from 'react';

const EuiIconAppUpgradeAssistant = ({ title, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path
      className="euiIcon__fillSecondary"
      d="M16 21a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z"
    />
    <path d="M27.42 19.69a12 12 0 01-23.11-1l2.27-.45-4.32-4.47L0 19.55l2.39-.47a14 14 0 0027 1.23l-1.97-.62zm2.23-6.77a14 14 0 00-27-1.23l1.9.62a12 12 0 0123.11 1l-2.27.45 4.32 4.46L32 12.45l-2.35.47z" />
  </svg>
);

export const icon = EuiIconAppUpgradeAssistant;
