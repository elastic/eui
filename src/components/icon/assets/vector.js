import React from 'react';

const EuiIconVector = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path d="M12.5 11V5H11V3.5H5V5H3.5v6H5v1.5h6V11h1.5zm1 0H15v4h-4v-1.5H5V15H1v-4h1.5V5H1V1h4v1.5h6V1h4v4h-1.5v6zM4 4V2H2v2h2zm8 0h2V2h-2v2zM2 14h2v-2H2v2zm10 0h2v-2h-2v2z" />
  </svg>
);

export const icon = EuiIconVector;
