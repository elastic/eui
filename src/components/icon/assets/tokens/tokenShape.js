import * as React from 'react';

const EuiIconTokenShape = ({ title, titleId, ...props }) => (
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
      d="M13 10v3h-3v-1H6v1H3v-3h1V6H3V3h3v1h4V3h3v3h-1v4h1zm-8 1H4v1h1v-1zm7 0h-1v1h1v-1zM5 4H4v1h1V4zm7 0h-1v1h1V4zm-1 2h-1V5H6v1H5v4h1v1h4v-1h1V6z"
    />
  </svg>
);

export const icon = EuiIconTokenShape;
