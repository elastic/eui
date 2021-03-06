import * as React from 'react';

const EuiIconEql = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={14}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M15 13l-3.9-3.9L11 9c-.2-.2-.5-.2-.7 0-.2.2-.2.5 0 .7l.2.2.3.3 2.7 2.7h-2.2l-2-2-.2-.2-.3-.3c-.1-.1-.2-.1-.3-.1-.2 0-.5.2-.5.2-.6.3-1.3.5-2 .5-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5c0 .3.2.5.5.5s.5-.2.5-.5c0-3.3-2.7-6-6-6S0 2.7 0 6s2.7 6 6 6c.9 0 1.7-.2 2.5-.5l2.3 2.3c.1.1.3.2.4.2h3.3c.6 0 .8-.6.5-1z" />
    <path d="M6.25 2.722l2.464 1.422a.5.5 0 01.25.433v2.846a.5.5 0 01-.25.433L6.25 9.278a.5.5 0 01-.5 0L3.286 7.856a.5.5 0 01-.25-.433V4.577a.5.5 0 01.25-.433L5.75 2.722a.5.5 0 01.5 0z" />
  </svg>
);

export const icon = EuiIconEql;
