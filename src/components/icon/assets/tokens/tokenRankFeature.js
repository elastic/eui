import React from 'react';

const EuiIconTokenRankFeature = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M7.5 4H13.5V12H12.5V5H8.5V9H3.59375V12H2.5V8H7.5V4Z"
    />
  </svg>
);

export const icon = EuiIconTokenRankFeature;
