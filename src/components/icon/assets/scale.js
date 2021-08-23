import * as React from 'react';

const EuiIconScale = ({ title, titleId, ...props }) => (
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
      d="M12.5 12a.5.5 0 110 1 .5.5 0 010-1zm-2 0a.5.5 0 110 1 .5.5 0 010-1zm-2 0a.5.5 0 110 1 .5.5 0 010-1zm4-2a.5.5 0 110 1 .5.5 0 010-1zm-2 0a.5.5 0 110 1 .5.5 0 010-1zm2-1a.5.5 0 110-1 .5.5 0 010 1zm0-3a.5.5 0 110 1 .5.5 0 010-1zm-2 2a.5.5 0 110 1 .5.5 0 010-1zm-2 0a.5.5 0 110 1 .5.5 0 010-1zm0 2a.5.5 0 110 1 .5.5 0 010-1zm-2 2a.5.5 0 110 1 .5.5 0 010-1zm-2 0a.5.5 0 110 1 .5.5 0 010-1zm2-2a.5.5 0 110 1 .5.5 0 010-1zm6-6a.5.5 0 110 1 .5.5 0 010-1zm-2 2a.5.5 0 110 1 .5.5 0 010-1z"
    />
  </svg>
);

export const icon = EuiIconScale;
