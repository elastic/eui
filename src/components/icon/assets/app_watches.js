import React from 'react';

const EuiIconAppWatches = props => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path d="M9.74 7.73l-1.5-1.32a13 13 0 0 0 0 17.19l1.5-1.32a11 11 0 0 1 0-14.54v-.01z" />
    <path d="M6.51 3.66L5 2.34c-6.377 7.24-6.377 18.09 0 25.33l1.5-1.32C.792 19.867.792 10.153 6.5 3.67l.01-.01zm17.25 2.75l-1.5 1.32a11 11 0 0 1 0 14.54l1.5 1.32a13 13 0 0 0 0-17.19v.01z" />
    <path d="M27 2.34l-1.5 1.32c5.708 6.483 5.708 16.197 0 22.68l1.5 1.33c6.377-7.24 6.377-18.09 0-25.33z" />
    <path
      className="euiIcon__fillSecondary"
      d="M21 15a5 5 0 1 0-6 4.9V31h2V19.9a5 5 0 0 0 4-4.9zm-5 3a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
    />
  </svg>
);

export const icon = EuiIconAppWatches;
