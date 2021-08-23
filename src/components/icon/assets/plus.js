import * as React from 'react';

const EuiIconPlus = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8.25 3a.5.5 0 01.5.5v3.75h3.75a.5.5 0 01.5.5v.5a.5.5 0 01-.5.5H8.75v3.75a.5.5 0 01-.5.5h-.5a.5.5 0 01-.5-.5V8.75H3.5a.5.5 0 01-.5-.5v-.5a.5.5 0 01.5-.5h3.75V3.5a.5.5 0 01.5-.5h.5z" />
  </svg>
);

export const icon = EuiIconPlus;
