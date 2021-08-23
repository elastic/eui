import * as React from 'react';

const EuiIconMenuRight = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M14.986 7.382a.501.501 0 01.013.152c.014.4-.133.806-.439 1.112l-2.12 2.122a.5.5 0 11-.708-.708L13.792 8H1.5a.5.5 0 010-1h12.121l-1.889-1.89a.5.5 0 01.707-.706l2.121 2.12c.241.242.383.544.426.858zM1.5 3h7a.5.5 0 010 1h-7a.5.5 0 010-1zm0 8h7a.5.5 0 110 1h-7a.5.5 0 110-1z" />
  </svg>
);

export const icon = EuiIconMenuRight;
