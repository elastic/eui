import * as React from 'react';

const EuiIconStats = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M8 14v-4h1v4h5V5h1v9a1 1 0 01-1 1H2a1 1 0 01-1-1v-2h1v2h6zm4.853-10.146l-2.999 3a1.5 1.5 0 01-2.538 1.568l-2.714.904L4 9.527a1.5 1.5 0 11-.316-.948L7 7.473a1.5 1.5 0 012.146-1.327l3-3a1.5 1.5 0 11.707.707z"
    />
  </svg>
);

export const icon = EuiIconStats;
