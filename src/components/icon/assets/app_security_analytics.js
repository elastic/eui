import React from 'react';

const EuiIconAppSecurityAnalytics = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10 12c5.43 0 9.848 4.327 9.996 9.72L20 22v1h-9v9h-1C4.477 32 0 27.523 0 22s4.477-10 10-10zm-1 9v-6.938a8.001 8.001 0 00-.25 15.84l.25.036V14.062 21zm2-6.938V21h6.938a8.005 8.005 0 00-6.68-6.902l-.257-.036z" />
    <path
      className="euiIcon__fillSecondary"
      d="M10 6c8.731 0 15.83 6.994 15.997 15.685L26 22h-2c0-7.628-6.1-13.83-13.687-13.997L10 8V6zm0-6c12.029 0 21.803 9.654 21.997 21.636L32 22h-2c0-10.93-8.769-19.813-19.656-19.997L10 2V0z"
    />
  </svg>
);

export const icon = EuiIconAppSecurityAnalytics;
