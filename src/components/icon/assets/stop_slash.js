import * as React from 'react';

const EuiIconStopSlash = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      id="stop_slash-a"
      d="M12.259 3.034A1.001 1.001 0 0012 3H4a1 1 0 00-1 1v8c0 .09.012.176.034.259l9.225-9.225zm.707.707l-9.225 9.225c.083.022.17.034.259.034h8a1 1 0 001-1V4c0-.09-.012-.176-.034-.259zM4 2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z"
    />
  </svg>
);

export const icon = EuiIconStopSlash;
