import React from 'react';

const EuiIconTokenFunction = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      fillRule="evenodd"
      d="M11.266 4.15V5.63a2.41 2.41 0 0 0-.859-.145c-.692 0-1.065.346-1.177 1.043l-.11.625h1.828v1.44H8.921l-.204 1.115C8.455 11.325 7.517 12 5.9 12c-.469 0-.882-.061-1.166-.167v-1.495c.273.117.591.178.903.178.659 0 1.01-.29 1.127-1.015l.157-.91H5.247V7.152h1.837l.188-.842C7.534 4.714 8.432 4 10.19 4c.39 0 .853.067 1.076.15z"
    />
  </svg>
);

export const icon = EuiIconTokenFunction;
