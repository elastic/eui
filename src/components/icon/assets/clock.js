import React from 'react';

const EuiIconClock = ({ title, titleId, ...props }) => (
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
      d="M7.5 13A5.506 5.506 0 012 7.5C2 4.467 4.467 2 7.5 2S13 4.467 13 7.5 10.533 13 7.5 13m0-12a6.5 6.5 0 100 13 6.5 6.5 0 000-13m3 6H8V3.5a.5.5 0 00-1 0v4a.5.5 0 00.5.5h3a.5.5 0 000-1"
    />
  </svg>
);

export const icon = EuiIconClock;
