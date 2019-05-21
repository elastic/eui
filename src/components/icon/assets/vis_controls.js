import React from 'react';

const EuiIconVisControls = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <defs>
      <path
        id="controls_horizontal-a"
        d="M10 7.95a2.5 2.5 0 0 1 0-4.9V1h1v2.05a2.5 2.5 0 0 1 0 4.9V15h-1V7.95zm-4 .1a2.5 2.5 0 0 1 0 4.9V15H5v-2.05a2.5 2.5 0 0 1 0-4.9V1h1v7.05zM5.5 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm5-8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
      />
    </defs>
    <use transform="rotate(90 8 8)" xlinkHref="#controls_horizontal-a" />
  </svg>
);

export const icon = EuiIconVisControls;
