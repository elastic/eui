import * as React from 'react';

const EuiIconShare = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M3 6.81v6.38c0 .493.448.9.992.9h7.016c.543 0 .992-.406.992-.9V6.81c0-.493-.448-.9-.992-.9H3.992c-.543 0-.992.406-.992.9zM6 5v.91h3V5h2.008C12.108 5 13 5.818 13 6.81v6.38c0 1-.9 1.81-1.992 1.81H3.992C2.892 15 2 14.182 2 13.19V6.81C2 5.81 2.9 5 3.992 5H6zm1.997-3.552A.506.506 0 018 1.5v8a.5.5 0 01-1 0v-8a.51.51 0 010-.017L5.18 3.394a.52.52 0 01-.77 0 .617.617 0 010-.829L6.36.515a1.552 1.552 0 012.31 0l1.95 2.05c.214.229.214.601 0 .83a.52.52 0 01-.77 0L7.997 1.447z" />
  </svg>
);

export const icon = EuiIconShare;
