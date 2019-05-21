import React from 'react';

const EuiIconEditorHeading = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <defs>
      <path
        id="editor_heading-a"
        d="M6 11a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2V5a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2v2h4V5a1 1 0 1 1 0-2h2a1 1 0 0 1 0 2v6a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2V9H6v2z"
      />
    </defs>
    <use xlinkHref="#editor_heading-a" />
  </svg>
);

export const icon = EuiIconEditorHeading;
