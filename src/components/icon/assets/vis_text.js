import * as React from 'react';

const EuiIconVisText = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8.5 5v6h2a.5.5 0 110 1h-5a.5.5 0 110-1h2V5H5v.5a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5h7a.5.5 0 01.5.51l-.021 1a.5.5 0 11-1-.02l.01-.49H8.5zM1 15h1.5a.5.5 0 110 1h-2a.5.5 0 01-.5-.5v-1.996a.5.5 0 011 0V15zM1 1v1.497a.5.5 0 11-1 0V.5A.5.5 0 01.5 0h2a.5.5 0 010 1H1zm14 0h-1.495a.5.5 0 010-1H15.5a.5.5 0 01.5.5v2a.5.5 0 11-1 0V1zm0 14v-1.5a.5.5 0 111 0v2a.5.5 0 01-.5.5h-2a.5.5 0 110-1H15zM0 6.5a.5.5 0 011 0v3a.5.5 0 01-1 0v-3zM9.5 0a.5.5 0 010 1h-3a.5.5 0 010-1h3zM15 6.5a.5.5 0 111 0v3a.5.5 0 11-1 0v-3zM9.5 15a.5.5 0 110 1h-3a.5.5 0 110-1h3z" />
  </svg>
);

export const icon = EuiIconVisText;
