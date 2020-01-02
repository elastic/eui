import React from 'react';

const EuiIconSecuritySignal = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.584 2.71a7 7 0 10.707.706l.366-.366a.5.5 0 10-.707-.707l-.366.366zm-.71.708a6 6 0 10.708.707L8.966 7.741a1 1 0 11-.707-.707l.757-.757a2 2 0 00-2.43 3.137.5.5 0 11-.707.707 3 3 0 013.86-4.567l.714-.714A4 4 0 108 12a.5.5 0 110 1 5 5 0 113.164-8.871l.71-.71z"
    />
  </svg>
);

export const icon = EuiIconSecuritySignal;
