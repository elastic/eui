import * as React from 'react';

const EuiIconTokenTokenCount = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 4H3v3h5V4zM13 9H8v3h5V9zM10 4h3v3h-3V4zM6 9H3v3h3V9z" />
  </svg>
);

export const icon = EuiIconTokenTokenCount;
