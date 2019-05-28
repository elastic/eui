import React from 'react';

const EuiIconAppSecurityAnalytics = props => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path d="M2 14h28v16c-3.333 1.333-8 2-14 2s-10.667-.667-14-2V14zm2 2v12.589C6.972 29.52 10.98 30 16 30s9.028-.48 12-1.411V16H4zm20-4V8.09C24 3.626 20.421 0 16 0c-4.421 0-8 3.625-8 8.09V12h2V8.09C10 4.725 12.69 2 16 2s6 2.724 6 6.09V12h2z" />
    <path
      className="euiIcon__fillSecondary"
      d="M8 18v6h2v-6zM22 18v6h2v-6zM15 18v8h2v-8z"
    />
  </svg>
);

export const icon = EuiIconAppSecurityAnalytics;
