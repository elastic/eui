import React from 'react';

const EuiIconEditorOrderedList = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M3 8v1h1v1H1V9h1V8H1V7h3v1H3zm1 4v2H1v-1h1v-1H1v-1h3v1zM3 5h1v1H1V5h1V4H1V3h2v2zm2.5-1h8a.5.5 0 110 1h-8a.5.5 0 010-1zm0 4h8a.5.5 0 110 1h-8a.5.5 0 010-1zm0 4h8a.5.5 0 110 1h-8a.5.5 0 110-1z" />
  </svg>
);

export const icon = EuiIconEditorOrderedList;
