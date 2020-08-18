import React from 'react';

const EuiIconMlCreateClassificationJob = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 18v6h3.035a14.142 14.142 0 000 2H8v6H6v-6H0v-2h6v-6h2zM8 0v6h6v2H8v6H6V8H0V6h6V0h2zm18 0v6h6v2h-6v3.035a14.142 14.142 0 00-2 0V8h-6V6h6V0h2z" />
    <path
      className="euiIcon__fillSecondary"
      d="M25 13c2.613 0 5.03.835 7 2.253l.001 2.864a9.83 9.83 0 00-.059-.06A9.818 9.818 0 0025 15.183c-5.422 0-9.818 4.396-9.818 9.818 0 2.74 1.123 5.22 2.934 7h-2.863A11.946 11.946 0 0113 25c0-6.627 5.373-12 12-12zm.941 7.647v3.765h3.765v1.882h-3.765v3.765h-1.882v-3.765h-3.765v-1.882h3.765v-3.765h1.882z"
    />
  </svg>
);

export const icon = EuiIconMlCreateClassificationJob;
