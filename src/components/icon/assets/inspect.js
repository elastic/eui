import * as React from 'react';

const EuiIconInspect = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M15.363 14.658a.5.5 0 11-.713.7l-2.97-3.023a.5.5 0 01.001-.7A3.9 3.9 0 108.9 12.8a.5.5 0 110 .999 4.9 4.9 0 113.821-1.833l2.642 2.691zM3.094 13a.5.5 0 110 1H2.5A2.5 2.5 0 010 11.5v-9A2.5 2.5 0 012.5 0h9A2.5 2.5 0 0114 2.5v.599a.5.5 0 11-1 0V2.5A1.5 1.5 0 0011.5 1h-9A1.5 1.5 0 001 2.5v9A1.5 1.5 0 002.5 13h.594zM2.5 3a.5.5 0 110-1 .5.5 0 010 1zm2 0a.5.5 0 110-1 .5.5 0 010 1zm2 0a.5.5 0 110-1 .5.5 0 010 1zm-4 2a.5.5 0 110-1 .5.5 0 010 1zm2 0a.5.5 0 110-1 .5.5 0 010 1zm-2 1a.5.5 0 110 1 .5.5 0 010-1zm0 3a.5.5 0 110-1 .5.5 0 010 1zm6-6a.5.5 0 110-1 .5.5 0 010 1zm2 0a.5.5 0 110-1 .5.5 0 010 1zm-8 8a.5.5 0 110-1 .5.5 0 010 1z" />
  </svg>
);

export const icon = EuiIconInspect;
