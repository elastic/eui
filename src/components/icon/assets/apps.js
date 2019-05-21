import React from 'react';

const EuiIconApps = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <defs>
      <path
        id="apps-a"
        d="M2 4V2h2v2H2zm5 0V2h2v2H7zm5 0V2h2v2h-2zM2 9V7h2v2H2zm5 0V7h2v2H7zm5 0V7h2v2h-2zM2 14v-2h2v2H2zm5 0v-2h2v2H7zm5 0v-2h2v2h-2z"
      />
    </defs>
    <use xlinkHref="#apps-a" />
  </svg>
);

export const icon = EuiIconApps;
