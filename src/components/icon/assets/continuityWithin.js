import * as React from 'react';

const EuiIconContinuityWithin = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M.5 3a.5.5 0 00-.5.5v9a.5.5 0 001 0v-9A.5.5 0 00.5 3zm14.5.5a.5.5 0 011 0v9a.5.5 0 01-1 0v-9zm-4.712 1.547a.5.5 0 01.532.069l3 2.5a.5.5 0 010 .768l-3 2.5A.5.5 0 0110 10.5V9H6v1.5a.5.5 0 01-.82.384l-3-2.5a.5.5 0 010-.768l3-2.5A.5.5 0 016 5.5V7h4V5.5a.5.5 0 01.288-.453z" />
  </svg>
);

export const icon = EuiIconContinuityWithin;
