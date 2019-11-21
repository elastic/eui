import React from 'react';

const EuiIconEditorUnorderedList = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M5.5 4h8a.5.5 0 110 1h-8a.5.5 0 010-1zm0 4h8a.5.5 0 110 1h-8a.5.5 0 010-1zm0 4h8a.5.5 0 110 1h-8a.5.5 0 110-1zm-3-7a.5.5 0 110-1 .5.5 0 010 1zm0 4a.5.5 0 110-1 .5.5 0 010 1zm0 4a.5.5 0 110-1 .5.5 0 010 1z" />
  </svg>
);

export const icon = EuiIconEditorUnorderedList;
