import React from 'react';

const EuiIconGrab = ({ title, titleId, ...props }) => (
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
      d="M13.5 6c.276 0 .5.232.5.5 0 .276-.229.5-.5.5h-11a.505.505 0 01-.5-.5c0-.276.229-.5.5-.5h11zm0 3c.276 0 .5.232.5.5 0 .276-.229.5-.5.5h-11a.505.505 0 01-.5-.5c0-.276.229-.5.5-.5h11z"
    />
  </svg>
);

export const icon = EuiIconGrab;
