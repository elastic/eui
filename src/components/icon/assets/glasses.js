import React from 'react';

const EuiIconGlasses = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M9.035 9A3.5 3.5 0 0115 7.05V4.5c0-1.072-.648-1.72-2.098-2.01a.5.5 0 01.196-.98C14.981 1.886 16 2.905 16 4.5v4.25c0 .072-.015.14-.043.202A3.5 3.5 0 119.035 10h-2.07A3.5 3.5 0 11.043 8.952.498.498 0 010 8.75V4.5c0-1.595 1.019-2.614 2.902-2.99a.5.5 0 01.196.98C1.648 2.78 1 3.428 1 4.5v2.55A3.5 3.5 0 016.965 9h2.07zM3.5 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm9 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
  </svg>
);

export const icon = EuiIconGlasses;
