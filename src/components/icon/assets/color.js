import * as React from 'react';

const EuiIconColor = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M13 11c1.334 1.393 2 2.435 2 3.125C15 15.161 14.105 16 13 16c-1.104 0-2-.84-2-1.875 0-.69.667-1.732 2-3.125zM5.857.15l6.34 6.45.016.02.324.321a1.5 1.5 0 01.11 2.006l-.103.114-4.474 4.513a1.5 1.5 0 01-2.123.008L1.464 9.06a1.5 1.5 0 01.007-2.12l4.472-4.45c.145-.146.313-.254.492-.327L5.144.85a.5.5 0 01.713-.7zm1.496 3.049a.5.5 0 00-.705 0L2.177 7.65a.498.498 0 00-.148.35h9.95a.498.498 0 00-.148-.35L7.353 3.2z" />
  </svg>
);

export const icon = EuiIconColor;
