import * as React from 'react';

const EuiIconLogoWindows = ({ title, titleId, ...props }) => (
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
      fill="#00ADEF"
      d="M0 4.51l12.977-1.768.006 12.518-12.971.074L0 4.51zm12.97 12.192l.011 12.529-12.97-1.784-.002-10.829 12.962.084zm1.574-14.19L31.751 0v15.1l-17.207.137V2.511zm17.21 14.308l-.003 15.033-17.207-2.429-.024-12.632 17.235.028z"
    />
  </svg>
);

export const icon = EuiIconLogoWindows;
