import React from 'react';

const EuiIconEditorAlignRight = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <defs>
      <path
        id="editor_align_right-a"
        d="M8 4V3h6v1H8zM4 7V6h10v1H4zm4 3V9h6v1H8zm-4 3v-1h10v1H4z"
      />
    </defs>
    <use xlinkHref="#editor_align_right-a" />
  </svg>
);

export const icon = EuiIconEditorAlignRight;
