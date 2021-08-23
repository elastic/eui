import * as React from 'react';

const EuiIconEditorAlignRight = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 4V3h6v1H8zM4 7V6h10v1H4zm4 3V9h6v1H8zm-4 3v-1h10v1H4z" />
  </svg>
);

export const icon = EuiIconEditorAlignRight;
