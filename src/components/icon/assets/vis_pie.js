import React from 'react';

const EuiIconVisPie = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M6.5 9a.5.5 0 01-.5-.5V3.023A5.5 5.5 0 1011.978 9H6.5zM7 8h5.5a.5.5 0 01.5.5A6.5 6.5 0 116.5 2a.5.5 0 01.5.5V8zm2-6.972V6h4.972C13.696 3.552 11.448 1.304 9 1.028zM14.5 7h-6a.5.5 0 01-.5-.5v-6a.5.5 0 01.5-.5C11.853 0 15 3.147 15 6.5a.5.5 0 01-.5.5zM6.146 8.854a.5.5 0 11.708-.708l4 4a.5.5 0 01-.708.708l-4-4z" />
  </svg>
);

export const icon = EuiIconVisPie;
