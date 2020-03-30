import React from 'react';

const EuiIconTokenRankFeatures = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M13 4V12H11V6H9V10H5V12H3V8H7V4H13Z" />
  </svg>
);

export const icon = EuiIconTokenRankFeatures;
