import React from 'react';

const EuiIconTokenFlattened = ({ title, titleId, ...props }) => (
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
      d="M3.25 3c-.13807 0-.25.11193-.25.25v2c0 .13807.11193.25.25.25h9.5c.1381 0 .25-.11193.25-.25v-2c0-.13807-.1119-.25-.25-.25h-9.5zM3.25 6.75c-.13807 0-.25.11193-.25.25v2c0 .13807.11193.25.25.25H5.5c.13807 0 .25-.11193.25-.25V7c0-.13807-.11193-.25-.25-.25H3.25zM3 10.75c0-.1381.11193-.25.25-.25H5.5c.13807 0 .25.1119.25.25v2c0 .1381-.11193.25-.25.25H3.25c-.13807 0-.25-.1119-.25-.25v-2zM6.31059 10.023c-.08262-.07288-.08262-.22353 0-.29598l3.05348-2.68329c.05353-.04715.12788-.05711.19075-.0253.06322.03182.1031.09928.1031.17327v1.34164L12.819 8.5169c.0992 0 .1796.08587.1796.19167v2.29993c0 .1058-.0804.1917-.1796.1917l-3.16108.0164v1.3417c0 .074-.03988.1414-.1031.1732-.06287.0319-.13722.0219-.19075-.0249L6.31059 10.023z"
    />
  </svg>
);

export const icon = EuiIconTokenFlattened;
