import React from 'react';

const EuiIconSortable = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M7 12.786V3.2L3.604 6.596a.5.5 0 01-.708-.707l3.536-3.535a1.5 1.5 0 012.121 0l3.536 3.535a.5.5 0 01-.707.707L8 3.214v9.557l3.382-3.382a.5.5 0 01.707.707l-3.536 3.536a1.5 1.5 0 01-2.121 0l-3.536-3.536a.5.5 0 01.708-.707L7 12.786z" />
  </svg>
);

export const icon = EuiIconSortable;
