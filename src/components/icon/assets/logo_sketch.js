import React from 'react';

const EuiIconLogoSketch = props => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <g fill="none">
      <path
        fill="#FFAE00"
        d="M16 32L0 11.454l6.931-10.38L16 0l9.069 1.074L32 11.454z"
      />
      <path fill="#EC6C00" d="M16 32L0 11.454h32z" />
      <path fill="#FFAE00" d="M16 32L6.477 11.454h19.045z" />
      <path fill="#FFEFB4" d="M16 0L6.477 11.454h19.045z" />
      <path
        fill="#FFAE00"
        d="M6.932 1.074L3.369 6.3.001 11.454h6.542zM25.069 1.074L28.632 6.3 32 11.454h-6.542z"
      />
      <path
        fill="#FED305"
        d="M6.931 1.074l-.453 10.38L16 0zM25.069 1.074l.453 10.38L16 0z"
      />
    </g>
  </svg>
);

export const icon = EuiIconLogoSketch;
