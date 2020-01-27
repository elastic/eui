import React from 'react';

const EuiIconMlCreatePopulationJob = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M16 21.706c-5.718 0-10.353-4.635-10.353-10.353S10.282 1 16 1s10.353 4.635 10.353 10.353S21.718 21.706 16 21.706zm0-18.824a8.47 8.47 0 100 16.942 8.47 8.47 0 000-16.942z" />
    <path
      className="euiIcon__fillSecondary"
      d="M20.706 10.412h-3.765V6.647h-1.882v3.765h-3.765v1.882h3.765v3.765h1.882v-3.765h3.765zM10.136 22.308l-1.449-1.204-2.381 2.823a3.765 3.765 0 00-1.6-.339 3.765 3.765 0 103.05 1.572l2.38-2.852zm-5.43 6.927a1.882 1.882 0 110-3.764 1.882 1.882 0 010 3.764zm22.588-5.647c-.554.003-1.1.129-1.6.367l-2.381-2.823-1.45 1.204 2.382 2.824a3.765 3.765 0 103.05-1.572zm0 5.647a1.882 1.882 0 110-3.764 1.882 1.882 0 010 3.764z"
    />
  </svg>
);

export const icon = EuiIconMlCreatePopulationJob;
