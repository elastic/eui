import React from 'react';

const EuiIconEditorItemAlignTop = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M7 3h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zM1.5 1h13a.5.5 0 110 1h-13a.5.5 0 010-1z" />
  </svg>
);

export const icon = EuiIconEditorItemAlignTop;
