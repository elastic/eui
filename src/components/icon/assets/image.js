import React from 'react';

const EuiIconImage = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M12 5l2 2v6H2v-2l3-3 2 2 5-5zM4 3a2 2 0 110 4 2 2 0 010-4zm11-2a1 1 0 011 1v12a1 1 0 01-1 1H1a1 1 0 01-1-1V2a1 1 0 011-1zm0 1H1v12h14V2z" />
  </svg>
);

export const icon = EuiIconImage;
