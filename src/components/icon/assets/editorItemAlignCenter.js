import * as React from 'react';

const EuiIconEditorItemAlignCenter = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 4H7V1.5a.5.5 0 011 0V4zm0 8v2.5a.5.5 0 11-1 0V12h1zM3 5h9a2 2 0 012 2v2a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2z" />
  </svg>
);

export const icon = EuiIconEditorItemAlignCenter;
