import * as React from 'react';

const EuiIconBoxesVertical = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7 1v2h2V1H7zM6 0h4v4H6V0zm0 6h4v4H6V6zm1 1v2h2V7H7zm-1 5h4v4H6v-4zm1 1v2h2v-2H7z" />
  </svg>
);

export const icon = EuiIconBoxesVertical;
