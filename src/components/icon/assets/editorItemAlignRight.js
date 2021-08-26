import * as React from 'react';

const EuiIconEditorItemAlignRight = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M3 5h8a2 2 0 012 2v2a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2zm11.5-4a.5.5 0 01.5.5v13a.5.5 0 11-1 0v-13a.5.5 0 01.5-.5z" />
  </svg>
);

export const icon = EuiIconEditorItemAlignRight;
