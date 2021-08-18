import * as React from 'react';

const EuiIconSortUp = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 4.207v8.237c0 .307-.224.556-.5.556s-.5-.249-.5-.556V4.207L2.904 8.303a.5.5 0 01-.707-.707l4.242-4.242a1.5 1.5 0 012.122 0l4.242 4.242a.5.5 0 11-.707.707L8 4.207z" />
  </svg>
);

export const icon = EuiIconSortUp;
