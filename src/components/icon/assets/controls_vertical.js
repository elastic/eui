import * as React from 'react';

const EuiIconControlsVertical = ({ title, titleId, ...props }) => (
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
      d="M10 7.95a2.5 2.5 0 010-4.9V1.5a.5.5 0 111 0v1.55a2.5 2.5 0 010 4.9v6.55a.5.5 0 11-1 0V7.95zm-4 .1a2.5 2.5 0 010 4.9v1.55a.5.5 0 11-1 0v-1.55a2.5 2.5 0 010-4.9V1.5a.5.5 0 011 0v6.55zM5.5 12a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm5-8a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
    />
  </svg>
);

export const icon = EuiIconControlsVertical;
