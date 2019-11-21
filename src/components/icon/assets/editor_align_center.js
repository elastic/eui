import React from 'react';

const EuiIconEditorAlignCenter = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M5 4V3h6v1H5zM3 7V6h10v1H3zm2 3V9h6v1H5zm-2 3v-1h10v1H3z" />
  </svg>
);

export const icon = EuiIconEditorAlignCenter;
