import React from 'react';

const EuiIconEditorItemAlignBottom = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M7 1h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V3a2 2 0 012-2zM1.5 14h13a.5.5 0 110 1h-13a.5.5 0 110-1z" />
  </svg>
);

export const icon = EuiIconEditorItemAlignBottom;
