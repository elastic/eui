import * as React from 'react';

const EuiIconEditorDistributeVertical = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M4 5h8a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2zM1.5 1h13a.5.5 0 110 1h-13a.5.5 0 010-1zm0 13h13a.5.5 0 110 1h-13a.5.5 0 110-1z" />
  </svg>
);

export const icon = EuiIconEditorDistributeVertical;
