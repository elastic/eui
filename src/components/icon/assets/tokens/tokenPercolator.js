import React from 'react';

const EuiIconTokenPercolator = ({ title, titleId, ...props }) => (
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
      clipRule="evenodd"
      d="M5.5 7C6.32843 7 7 6.32843 7 5.5C7 4.67157 6.32843 4 5.5 4C4.67157 4 4 4.67157 4 5.5C4 6.32843 4.67157 7 5.5 7ZM5.5 8C6.88071 8 8 6.88071 8 5.5C8 4.11929 6.88071 3 5.5 3C4.11929 3 3 4.11929 3 5.5C3 6.88071 4.11929 8 5.5 8ZM11 9C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7C10.4477 7 10 7.44772 10 8C10 8.55228 10.4477 9 11 9ZM11 10C12.1046 10 13 9.10457 13 8C13 6.89543 12.1046 6 11 6C9.89543 6 9 6.89543 9 8C9 9.10457 9.89543 10 11 10ZM8.5 11.5C8.5 11.7761 8.27614 12 8 12C7.72386 12 7.5 11.7761 7.5 11.5C7.5 11.2239 7.72386 11 8 11C8.27614 11 8.5 11.2239 8.5 11.5ZM9.5 11.5C9.5 12.3284 8.82843 13 8 13C7.17157 13 6.5 12.3284 6.5 11.5C6.5 10.6716 7.17157 10 8 10C8.82843 10 9.5 10.6716 9.5 11.5Z"
    />
  </svg>
);

export const icon = EuiIconTokenPercolator;
