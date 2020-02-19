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
    <path d="M6 5a2 2 0 11-4 0 2 2 0 014 0zm9-4a1 1 0 011 1v12a1 1 0 01-1 1H1a1 1 0 01-1-1V2a1 1 0 011-1zm0 1H1v12h14V2zm-3.842 4.123c.2-.164.59-.164.79 0l1.948 1.605a.256.256 0 01.104.194v4.76c0 .176-.224.318-.5.318h-11c-.276 0-.5-.142-.5-.318v-2.406c0-.079.046-.155.13-.214L5.165 7.94c.184-.129.498-.14.703-.023L7.705 8.96z" />
  </svg>
);

export const icon = EuiIconImage;
