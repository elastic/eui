import * as React from 'react';

const EuiIconIndexRuntime = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M12 2H2v11h6v1H1V1h12v6.839l-1-.707V2z" />
    <path d="M8 11v-1H5v1h3zm0-3.055c0-.342.082-.664.23-.945H5v1h3v-.055zM5 5h5.999V4H5v1zM3 4v1h1V4H3zm0 3v1h1V7H3zm0 3v1h1v-1H3zm11.607.2l-4.32-3.055C9.727 6.75 9 7.204 9 7.945v6.108c0 .74.726 1.196 1.287.8l4.32-3.055c.524-.37.524-1.228 0-1.598z" />
  </svg>
);

export const icon = EuiIconIndexRuntime;
