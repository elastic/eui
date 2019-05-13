import React from 'react';

const EuiIconEditorAlignCenter = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <defs>
      <path
        id="editor_align_center-a"
        d="M5 4V3h6v1H5zM3 7V6h10v1H3zm2 3V9h6v1H5zm-2 3v-1h10v1H3z"
      />
    </defs>
    <use xlinkHref="#editor_align_center-a" />
  </svg>
);

export const icon = EuiIconEditorAlignCenter;
