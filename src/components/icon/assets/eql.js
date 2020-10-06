import * as React from 'react';

const EuiIconEql = ({ title, titleId, ...props }) => (
  <svg
    viewBox="0 0 16 14"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g data-name="Layer 2">
      <g data-name="Layer 1">
        <path d="M6 1a4.99 4.99 0 014.265 7.597l-.41.672.557.557L13.586 13h-2.192L9.16 10.765l-.487-.487-.63.282A4.999 4.999 0 116 1m0-1a6 6 0 102.452 11.472L10.98 14H16l-4.881-4.881A5.99 5.99 0 006 0z" />
        <path d="M5.991 3a3 3 0 11-3 3 3.003 3.003 0 013-3m0-1a4 4 0 104 4 4 4 0 00-4-4z" />
        <path d="M5.991 5.155l.733.422v.846l-.733.422-.732-.422v-.846l.732-.422m0-1.155L4.26 5v2l1.732 1 1.733-1V5L5.992 4z" />
      </g>
    </g>
  </svg>
);

export const icon = EuiIconEql;
