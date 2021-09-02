import * as React from 'react';

const EuiIconAppRecentlyViewed = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16a16 16 0 01-16 16zm0-30C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14A14 14 0 0016 2z" />
    <path
      className="euiIcon__fillSecondary"
      d="M15 4h2v9.17A3.009 3.009 0 0118.83 15H26v2h-7.17A3.001 3.001 0 1115 13.17V4zm1 13a1 1 0 100-2 1 1 0 000 2z"
    />
  </svg>
);

export const icon = EuiIconAppRecentlyViewed;
