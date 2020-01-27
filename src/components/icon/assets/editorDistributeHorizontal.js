import React from 'react';

const EuiIconEditorDistributeHorizontal = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7 2h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zM1.5 1a.5.5 0 01.5.5v13a.5.5 0 11-1 0v-13a.5.5 0 01.5-.5zm13 0a.5.5 0 01.5.5v13a.5.5 0 11-1 0v-13a.5.5 0 01.5-.5z" />
  </svg>
);

export const icon = EuiIconEditorDistributeHorizontal;
