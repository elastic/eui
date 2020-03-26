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
    <path fillRule="evenodd" d="M13 4H7V8H3V12H4.5V9.5H8.5V5.5H11.5V12H13V4Z" />
  </svg>
);

export const icon = EuiIconTokenRankFeatures;
