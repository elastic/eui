import React from 'react';

const EuiIconAppGraph = props => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      className="euiIcon__fillSecondary"
      d="M24 20a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8.2-5.62A4 4 0 1 1 18 1.06a4 4 0 0 1-2.2 7.32zm0-6a2 2 0 1 0 .01 0h-.01zm.01 29.24a4 4 0 1 1-.083-8 4 4 0 0 1 .083 8zm0-6a2 2 0 1 0 .39 0 2 2 0 0 0-.4 0h.01z"
    />
    <path d="M18 17v-2h-6.14a4 4 0 0 0-.86-1.64l2.31-3.44-1.68-1.12-2.31 3.44A4 4 0 0 0 8 12a4 4 0 1 0 0 8 4 4 0 0 0 1.32-.24l2.31 3.44 1.66-1.12L11 18.64a4 4 0 0 0 .86-1.64H18zM6 16a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
  </svg>
);

export const icon = EuiIconAppGraph;
