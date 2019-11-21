import React from 'react';

const EuiIconKqlValue = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M8 4a5 5 0 110 8 5 5 0 110-8zm-.75.692a4 4 0 100 6.615A4.981 4.981 0 016 8c0-1.268.472-2.426 1.25-3.308zM11.348 11l2.078-5.637h-.739l-1.656 4.727h-.062L9.313 5.363h-.739L10.652 11h.696z" />
  </svg>
);

export const icon = EuiIconKqlValue;
