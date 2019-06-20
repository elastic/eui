import React from 'react';

const EuiIconPopout = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path d="M1.146 3.146A.498.498 0 0 1 1.5 3h6a.5.5 0 0 1 0 1H2v10h10V8.5a.5.5 0 1 1 1 0v6a.498.498 0 0 1-.5.5h-11a.498.498 0 0 1-.5-.5v-11c0-.138.056-.263.146-.354zM13.306 2H10.5a.5.5 0 1 1 0-1h4a.498.498 0 0 1 .5.5v4a.5.5 0 1 1-1 0V2.72L6.88 9.838a.5.5 0 0 1-.706-.707L13.305 2z" />
  </svg>
);

export const icon = EuiIconPopout;
