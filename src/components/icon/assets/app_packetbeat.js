import * as React from 'react';

const EuiIconAppPacketbeat = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      className="euiIcon__fillSecondary"
      d="M16 20a4 4 0 110-8 4 4 0 010 8zm0-6a2 2 0 100 4 2 2 0 000-4z"
    />
    <path d="M8 4a4 4 0 10-4 4 4 4 0 002-.57l5.27 5.27 1.41-1.41L7.43 6A4 4 0 008 4zM4 6a2 2 0 110-4 2 2 0 010 4zm16.71 6.71L26 7.43A4 4 0 0028 8a4 4 0 10-4-4 4 4 0 00.57 2l-5.27 5.27 1.41 1.44zM28 2a2 2 0 110 4 2 2 0 010-4zM11.29 19.29L6 24.57A4 4 0 004 24a4 4 0 104 4 4 4 0 00-.57-2l5.27-5.27-1.41-1.44zM4 30a2 2 0 110-4 2 2 0 010 4zm24-6a4 4 0 00-2 .57l-5.27-5.27-1.41 1.41L24.57 26a4 4 0 00-.57 2 4 4 0 104-4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
);

export const icon = EuiIconAppPacketbeat;
