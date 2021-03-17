import * as React from 'react';

const EuiIconIndexRuntime = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10.999 5H5V4h5.999v1zM3 4v1h1V4H3zm0 3v1h1V7H3zm0 3v1h1v-1H3z" />
    <path
      fillRule="evenodd"
      d="M7.672 14H1V1h12v5.758A4.5 4.5 0 117.672 14zM2 2h10v4.256A4.492 4.492 0 0010.5 6a4.481 4.481 0 00-2.828 1H5v1h1.758a4.473 4.473 0 00-.73 2H5v1h1.027c.082.734.34 1.416.73 2H2V2zm7 11l4-2.5L9 8v5z"
    />
  </svg>
);

export const icon = EuiIconIndexRuntime;
