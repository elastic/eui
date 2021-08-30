import * as React from 'react';

const EuiIconDocument = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10.8 0c.274 0 .537.113.726.312l3.2 3.428c.176.186.274.433.274.689V15a1 1 0 01-1 1H2a1 1 0 01-1-1V1a1 1 0 011-1h8.8zM14 5h-3.5a.5.5 0 01-.5-.5V1H2v14h12V5zm-8.5 7a.5.5 0 110-1h5a.5.5 0 110 1h-5zm0-3a.5.5 0 010-1h5a.5.5 0 110 1h-5z" />
  </svg>
);

export const icon = EuiIconDocument;
