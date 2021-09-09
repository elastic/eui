import * as React from 'react';

const EuiIconTokenBoolean = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M8 13A5 5 0 118 3a5 5 0 010 10zm-2.828-2.172a4 4 0 015.656-5.656c.004.013-5.645 5.674-5.656 5.656z"
    />
  </svg>
);

export const icon = EuiIconTokenBoolean;
