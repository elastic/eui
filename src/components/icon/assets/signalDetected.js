import React from 'react';

const EuiIconSignalDetected = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M13.657 3.05a.5.5 0 10-.707-.707l-.366.366a7 7 0 10-3.852 12.253 4.483 4.483 0 01-.478-.967 6 6 0 113.62-10.576l-.71.71a5 5 0 10-3.137 8.87 4.55 4.55 0 010-.998L8 12a4 4 0 112.453-7.16l-.715.714a3 3 0 00-3.86 4.567.5.5 0 10.708-.707 2 2 0 012.43-3.137l-.757.757a1 1 0 10.707.707l3.616-3.616a5.985 5.985 0 011.413 4.13c.343.12.667.281.967.477a6.988 6.988 0 00-1.671-5.316l.366-.366z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 12.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zm-3-2a.5.5 0 10-1 0v2a.5.5 0 001 0v-2zm-.5 4.5a.5.5 0 100-1 .5.5 0 000 1z"
    />
  </svg>
);

export const icon = EuiIconSignalDetected;
