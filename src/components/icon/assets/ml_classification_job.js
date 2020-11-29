import * as React from 'react';

const EuiIconMlClassificationJob = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7 16v5h2.038a13.179 13.179 0 000 2H7v5H5v-5H0v-2h5v-5h2zM7 0v5h5v2H7v5H5V7H0V5h5V0h2zm16 0v5h5v2h-5v2.038a13.179 13.179 0 00-2 0V7h-5V5h5V0h2z" />
    <path
      className="euiIcon__fillSecondary"
      d="M22 10c3.073 0 5.877 1.155 8 3.056v3.252A9.82 9.82 0 1016.307 30h-3.251A11.955 11.955 0 0110 22c0-6.627 5.373-12 12-12zm1 8v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2z"
    />
  </svg>
);

export const icon = EuiIconMlClassificationJob;
