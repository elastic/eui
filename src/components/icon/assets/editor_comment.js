import React from 'react';

const EuiIconEditorComment = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M6.111 10H12a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v4a1 1 0 001 1h1v1.297L6.111 10zm.46 1L4 14v-3a2 2 0 01-2-2V5a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H6.571z" />
  </svg>
);

export const icon = EuiIconEditorComment;
