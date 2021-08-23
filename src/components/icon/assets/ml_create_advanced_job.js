import * as React from 'react';

const EuiIconMlCreateAdvancedJob = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16h-2c0-7.732-6.268-14-14-14S2 8.268 2 16s6.268 14 14 14v2z" />
    <path
      className="euiIcon__fillSecondary"
      d="M27 20v12h-2V20h2zm-5 4v8h-2v-8h2zm10-2v10h-2V22h2zM17 9v6h6v2h-6v6h-2v-6H9v-2h6V9h2z"
    />
  </svg>
);

export const icon = EuiIconMlCreateAdvancedJob;
