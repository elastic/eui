import * as React from 'react';

const EuiIconUpperCase = ({ title, titleId, ...props }) => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.626 2.75a.5.5 0 01.468.327l3.076 8.32a.5.5 0 01-.938.346L5.224 9.016H2.027L1.02 11.743a.5.5 0 11-.938-.347l3.076-8.32a.5.5 0 01.469-.326zm0 1.942L4.91 8.166H2.34l1.284-3.474zm7.746-1.942a.5.5 0 01.469.327l3.075 8.32a.5.5 0 11-.938.346L12.97 9.016H9.773l-1.008 2.727a.5.5 0 11-.938-.347l3.076-8.32a.5.5 0 01.469-.326zm0 1.942l1.284 3.474h-2.568l1.284-3.474z"
      fill="currentColor"
    />
  </svg>
);

export const icon = EuiIconUpperCase;
