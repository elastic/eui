import React from 'react';

const EuiIconLogstashInput = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M1.747 10.992h13.1a.123.123 0 00.122-.123V8.51a.122.122 0 00-.122-.122H1.122A.122.122 0 001 8.51v2.36c0 .066.055.122.122.122h.625zm12.011 1H2.21V16h-1v-4.008h-.088A1.124 1.124 0 010 10.87V8.51c0-.62.503-1.122 1.122-1.122h13.725c.62 0 1.122.502 1.122 1.122v2.36c0 .618-.503 1.122-1.122 1.122h-.089V16h-1v-4.008zm-6.27-7.487V0h1v4.529l2.407-2.262.685.73L8 6.356 4.42 2.995l.685-.729 2.383 2.24z" />
  </svg>
);

export const icon = EuiIconLogstashInput;
