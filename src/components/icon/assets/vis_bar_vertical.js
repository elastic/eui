import * as React from 'react';

const EuiIconVisBarVertical = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10 7.5v6a.5.5 0 11-1 0V8H6v5.5a.5.5 0 11-1 0V3H2v10.5a.5.5 0 11-1 0v-11a.5.5 0 01.5-.5h4a.5.5 0 01.5.5V7h3V4.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v9a.5.5 0 11-1 0V5h-3v2.5zM.5 16a.5.5 0 110-1h14a.5.5 0 110 1H.5z" />
  </svg>
);

export const icon = EuiIconVisBarVertical;
