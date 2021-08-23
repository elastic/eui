import * as React from 'react';

const EuiIconTokenRankFeatures = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M13 4v8h-2V6H9v4H5v2H3V8h4V4h6z" />
  </svg>
);

export const icon = EuiIconTokenRankFeatures;
