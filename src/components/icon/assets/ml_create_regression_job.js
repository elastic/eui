import React from 'react';

const EuiIconMlCreateRegressionJob = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      className="euiIcon__fillSecondary"
      d="M32 21v11H21V21h11zm-2 2h-7v7h7v-7zM11 0v11H0V0h11zM9 2H2v7h7V2z"
    />
    <path d="M24 0a8 8 0 11-4.906 14.32l-4.774 4.774a8 8 0 11-1.414-1.414l4.774-4.774A8 8 0 0124 0zM8 18a6 6 0 100 12 6 6 0 000-12zM24 2a6 6 0 100 12 6 6 0 000-12z" />
  </svg>
);

export const icon = EuiIconMlCreateRegressionJob;
