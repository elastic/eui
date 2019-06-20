import React from 'react';

const EuiIconPopout = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path d="M12 8.5a.5.5 0 1 1 1 0V13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4.5a.5.5 0 0 1 0 1H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8.5zm2-5.78L6.88 9.838a.5.5 0 0 1-.706-.707L13.305 2H10.5a.5.5 0 1 1 0-1H14a1 1 0 0 1 1 1v3.5a.5.5 0 1 1-1 0V2.72z" />
  </svg>
);

export const icon = EuiIconPopout;
