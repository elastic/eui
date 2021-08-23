import * as React from 'react';

const EuiIconBoxesHorizontal = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M0 6h4v4H0V6zm1 1v2h2V7H1zm5-1h4v4H6V6zm1 1v2h2V7H7zm5-1h4v4h-4V6zm1 3h2V7h-2v2z" />
  </svg>
);

export const icon = EuiIconBoxesHorizontal;
