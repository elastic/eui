import * as React from 'react';

const EuiIconMenuLeft = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M1.014 7.382a.501.501 0 00-.013.152c-.014.4.133.806.439 1.112l2.12 2.122a.5.5 0 10.708-.708L2.208 8H14.5a.5.5 0 000-1H2.379l1.889-1.89a.5.5 0 00-.707-.706L1.44 6.524c-.241.242-.383.544-.426.858zM14.5 3h-7a.5.5 0 000 1h7a.5.5 0 000-1zm0 8h-7a.5.5 0 100 1h7a.5.5 0 100-1z" />
  </svg>
);

export const icon = EuiIconMenuLeft;
