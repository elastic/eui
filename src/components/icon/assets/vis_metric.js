import * as React from 'react';

const EuiIconVisMetric = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M6.532 7.34a2.161 2.161 0 112.936 0 2.746 2.746 0 11-2.936 0zM2 0h12a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1H2zm6 5.915a1.161 1.161 0 100-2.322 1.161 1.161 0 000 2.322zm0 4.492a1.746 1.746 0 100-3.492 1.746 1.746 0 000 3.492z" />
  </svg>
);

export const icon = EuiIconVisMetric;
