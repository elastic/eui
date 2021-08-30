import * as React from 'react';

const EuiIconNested = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M5.5 1a.5.5 0 010 1H3.006C2.45 2 2 2.45 2 3.006v9.988C2 13.55 2.45 14 3.006 14H5.5a.5.5 0 110 1H3.006A2.005 2.005 0 011 12.994V3.006C1 1.898 1.897 1 3.006 1H5.5zm7.494 0c1.059 0 1.924.818 2 1.856l.006.15v9.988a2.005 2.005 0 01-1.856 2l-.15.006H10.5a.5.5 0 01-.09-.992L10.5 14h2.494c.516 0 .941-.388 1-.888l.006-.118V3.006c0-.516-.388-.941-.888-1L12.994 2H10.5a.5.5 0 01-.09-.992L10.5 1h2.494zM5 7a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z" />
  </svg>
);

export const icon = EuiIconNested;
