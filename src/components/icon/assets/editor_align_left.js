import React from 'react';

const EuiIconEditorAlignLeft = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M2 4V3h6v1H2zm0 3V6h10v1H2zm0 3V9h6v1H2zm0 3v-1h10v1H2z" />
  </svg>
);

export const icon = EuiIconEditorAlignLeft;
