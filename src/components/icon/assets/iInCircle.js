import React from 'react';

const EuiIconIInCircle = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M7.5 11.508L7.468 8H6.25V7h2.401l.03 3.508H9.8v1H7.5zm-.25-6.202a.83.83 0 01.207-.577c.137-.153.334-.229.59-.229.256 0 .454.076.594.23.14.152.209.345.209.576 0 .228-.07.417-.21.568-.14.15-.337.226-.593.226-.256 0-.453-.075-.59-.226a.81.81 0 01-.207-.568zM8 13A5 5 0 108 3a5 5 0 000 10zm0 1A6 6 0 118 2a6 6 0 010 12z"
    />
  </svg>
);

export const icon = EuiIconIInCircle;
