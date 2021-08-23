import * as React from 'react';

const EuiIconAppHeartbeat = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      className="euiIcon__fillSecondary"
      d="M4.14 15.39a8.058 8.058 0 01-2.2-4.043A6.788 6.788 0 014.198 5.47a6.73 6.73 0 018.727-.213l1.26-1.464a8.65 8.65 0 00-11.277.232A8.727 8.727 0 00.068 11.6a10.172 10.172 0 002.793 5.275l1.28-1.484z"
    />
    <path d="M15.515 31.274L4.548 18.454 15.855 4.763a8.67 8.67 0 0112.266-.746 8.727 8.727 0 012.91 7.205c-.243 2.695-2.037 4.732-3.482 6.37L15.515 31.275zm-8.427-12.82l8.427 9.862 10.55-11.995c1.32-1.503 2.822-3.21 3.007-5.265a6.788 6.788 0 00-2.24-5.586 6.73 6.73 0 00-9.504.563L7.088 18.455z" />
  </svg>
);

export const icon = EuiIconAppHeartbeat;
