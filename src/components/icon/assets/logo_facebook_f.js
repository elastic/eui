import React from 'react';

const EuiIconLogoFacebookF = ({ title, titleId, ...props }) => (
  <svg
    viewBox="0 0 32 32"
    width={32}
    height={32}
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g>
      <path
        d="M32,30c0,1.104-0.896,2-2,2H2c-1.104,0-2-0.896-2-2V2c0-1.104,0.896-2,2-2h28c1.104,0,2,0.896,2,2V30z"
        fill="#3B5998"
      />
      <path
        d="M22,32V20h4l1-5h-5v-2c0-2,1.002-3,3-3h2V5c-1,0-2.24,0-4,0c-3.675,0-6,2.881-6,7v3h-4v5h4v12H22z"
        fill="#FFFFFF"
        id="f"
      />
    </g>
  </svg>
);

export const icon = EuiIconLogoFacebookF;
