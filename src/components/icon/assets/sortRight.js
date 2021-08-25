import * as React from 'react';

const EuiIconSortRight = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M11.692 7H3.556C3.249 7 3 7.224 3 7.5s.249.5.556.5h8.136l-4.096 4.096a.5.5 0 00.707.707l4.243-4.242c.258-.259.403-.587.433-.925a.454.454 0 000-.272 1.494 1.494 0 00-.433-.925L8.303 2.197a.5.5 0 10-.707.707L11.692 7z" />
  </svg>
);

export const icon = EuiIconSortRight;
