import React from 'react';

const EuiIconEditorHeading = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M6 11a1 1 0 010 2H4a1 1 0 010-2V5a1 1 0 110-2h2a1 1 0 110 2v2h4V5a1 1 0 110-2h2a1 1 0 010 2v6a1 1 0 010 2h-2a1 1 0 010-2V9H6v2z" />
  </svg>
);

export const icon = EuiIconEditorHeading;
