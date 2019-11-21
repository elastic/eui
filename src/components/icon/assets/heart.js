import React from 'react';

const EuiIconHeart = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M7.402 3.098a3.75 3.75 0 00-5.304 5.304l5.558 5.27L8 14l5.892-5.588a3.75 3.75 0 10-5.294-5.313L8 3.697l-.598-.599zM2.796 7.685a2.747 2.747 0 01.01-3.88 2.75 2.75 0 013.889 0L8 5.111l1.305-1.306a2.75 2.75 0 113.89 3.89L8 12.62 2.796 7.685z" />
  </svg>
);

export const icon = EuiIconHeart;
