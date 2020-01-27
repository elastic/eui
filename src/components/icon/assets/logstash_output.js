import React from 'react';

const EuiIconLogstashOutput = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M2.21 4.008H13.76V0h1v4.008h.088c.619 0 1.122.504 1.122 1.123V7.49c0 .62-.503 1.122-1.122 1.122H1.122A1.122 1.122 0 010 7.49V5.13c0-.618.503-1.122 1.122-1.122h.089V0h1v4.008zm11.549 1H1.12A.123.123 0 001 5.13V7.49c0 .068.055.122.122.122h13.725a.122.122 0 00.122-.122V5.13a.123.123 0 00-.122-.122h-1.088zm-5.301 9.097l2.405-2.26.686.728-3.58 3.363-3.58-3.363.686-.728 2.383 2.24V9.577h1v4.528z" />
  </svg>
);

export const icon = EuiIconLogstashOutput;
