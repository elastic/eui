import React from 'react';

const EuiIconTokenDate = ({ title, titleId, ...props }) => (
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
      d="M13 11.567C13 12.36 12.36 13 11.567 13H4.433C3.64 13 3 12.36 3 11.567V4.433C3 3.64 3.64 3 4.433 3H6v-.495a.51.51 0 01.412-.497L6.5 2c.276 0 .5.214.5.505V3h2v-.495a.51.51 0 01.412-.497L9.5 2c.276 0 .5.214.5.505V3h1.567C12.36 3 13 3.64 13 4.433v7.134zM4 6v5.33c0 .37.3.67.67.67h6.66c.37 0 .67-.3.67-.67V6H4zm1.5 4c.245 0 .45.183.492.412L6 10.5c0 .245-.183.45-.412.492L5.5 11a.505.505 0 01-.5-.5c0-.245.183-.45.412-.492L5.5 10zM8 10c.245 0 .45.183.492.412l.008.088c0 .245-.183.45-.412.492L8 11a.505.505 0 01-.5-.5c0-.245.183-.45.412-.492L8 10zm2.5 0c.245 0 .45.183.492.412L11 10.5c0 .245-.183.45-.412.492L10.5 11a.505.505 0 01-.5-.5c0-.245.183-.45.412-.492L10.5 10zm-5-1.5c.245 0 .45.183.492.412L6 9c0 .245-.183.45-.412.492L5.5 9.5A.505.505 0 015 9c0-.245.183-.45.412-.492L5.5 8.5zm2.5 0c.245 0 .45.183.492.412L8.5 9c0 .245-.183.45-.412.492L8 9.5a.505.505 0 01-.5-.5c0-.245.183-.45.412-.492L8 8.5zm2.5 0c.245 0 .45.183.492.412L11 9c0 .245-.183.45-.412.492L10.5 9.5A.505.505 0 0110 9c0-.245.183-.45.412-.492L10.5 8.5zM5.5 7c.245 0 .45.183.492.412L6 7.5c0 .245-.183.45-.412.492L5.5 8a.505.505 0 01-.5-.5c0-.245.183-.45.412-.492L5.5 7zM8 7c.245 0 .45.183.492.412L8.5 7.5c0 .245-.183.45-.412.492L8 8a.505.505 0 01-.5-.5c0-.245.183-.45.412-.492L8 7zm2.5 0c.245 0 .45.183.492.412L11 7.5c0 .245-.183.45-.412.492L10.5 8a.505.505 0 01-.5-.5c0-.245.183-.45.412-.492L10.5 7zM4 5h8v-.33c0-.37-.3-.67-.67-.67H4.67C4.3 4 4 4.3 4 4.67V5z"
    />
  </svg>
);

export const icon = EuiIconTokenDate;
