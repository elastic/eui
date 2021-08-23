import * as React from 'react';

const EuiIconSortLeft = ({ title, titleId, ...props }) => (
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
      d="M4.308 7h8.136c.307 0 .556.224.556.5s-.249.5-.556.5H4.308l4.096 4.096a.5.5 0 01-.707.707L3.454 8.561a1.494 1.494 0 01-.433-.925.454.454 0 010-.272c.03-.338.175-.666.433-.925l4.243-4.242a.5.5 0 11.707.707L4.308 7z"
      fillRule="evenodd"
    />
  </svg>
);

export const icon = EuiIconSortLeft;
