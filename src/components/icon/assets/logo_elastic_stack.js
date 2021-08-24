import * as React from 'react';

const EuiIconLogoElasticStack = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g fill="none" fillRule="evenodd">
      <path
        fill="#F04E98"
        d="M32 9V2.5A2.5 2.5 0 0029.5 0h-27A2.5 2.5 0 000 2.5V9h32z"
      />
      <path fill="#00BFB3" d="M0 20h32v-8H0z" />
      <path fill="#0080D5" d="M14.5 23H0v6.5A2.5 2.5 0 002.5 32h12v-9z" />
      <path fill="#FEC514" d="M17.5 23v9h12a2.5 2.5 0 002.5-2.5V23H17.5z" />
    </g>
  </svg>
);

export const icon = EuiIconLogoElasticStack;
