import React from 'react';

const EuiIconMlCreateOutlierDetectionJob = ({ title, titleId, ...props }) => (
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
      d="M16 24a4 4 0 110 8 4 4 0 010-8zm12 0a4 4 0 110 8 4 4 0 010-8zm-12 1.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm12 0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM28 12a4 4 0 110 8 4 4 0 010-8zm0 1.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM10 6a4 4 0 110 8 4 4 0 010-8zm0 1.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
    />
    <path d="M2 13v5h5v2H0v-7h2zm18 0v7h-7v-2h5v-5h2zM7 0v2H2v5H0V0h7zm13 0v7h-2V2h-5V0h7z" />
  </svg>
);

export const icon = EuiIconMlCreateOutlierDetectionJob;
