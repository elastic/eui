import * as React from 'react';

const EuiIconPlusInCircle = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M8 7h3.5a.5.5 0 110 1H8v3.5a.5.5 0 11-1 0V8H3.5a.5.5 0 010-1H7V3.5a.5.5 0 011 0V7zm-.5-7C11.636 0 15 3.364 15 7.5S11.636 15 7.5 15 0 11.636 0 7.5 3.364 0 7.5 0zm0 .882a6.618 6.618 0 100 13.236A6.618 6.618 0 007.5.882z"
    />
  </svg>
);

export const icon = EuiIconPlusInCircle;
