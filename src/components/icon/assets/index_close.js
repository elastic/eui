import React from 'react';

const EuiIconIndexClose = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M12 2H2v11h6v1H1V1h12v6h-1V2zM5 5h5.999V4H5v1zM3 5V4h1v1H3zm2 3V7h3v1H5zM3 8V7h1v1H3zm2 3v-1h2v1H5zm5.5-1.207L9.086 8.379l-.707.707L9.793 10.5l-1.414 1.414.707.707 1.414-1.414 1.414 1.414.707-.707-1.414-1.414 1.414-1.414-.707-.707L10.5 9.793zM3 11v-1h1v1H3zm7.5-5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
  </svg>
);

export const icon = EuiIconIndexClose;
