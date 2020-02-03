import React from 'react';

const EuiIconVisAreaStacked = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M.5 1a.5.5 0 01.5.5V15h13.5a.5.5 0 110 1H.5a.5.5 0 01-.5-.5v-14A.5.5 0 01.5 1zm4.342 2.194L8.295 7.65l1.837-1.64a.5.5 0 01.703.037l3.035 3.336a.5.5 0 01.13.337v3.78a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5V6.02a.5.5 0 01.104-.305l1.947-2.52a.5.5 0 01.791-.001zm-.394 1.123L3 6.191v4.101l1.146-1.146a.5.5 0 01.493-.126l.085.033L8.5 10.94l1.776-.888a.5.5 0 01.36-.034l.088.034L13 11.19V9.913l-2.571-2.826L8.56 8.753a.5.5 0 01-.728-.067L4.448 4.317z" />
  </svg>
);

export const icon = EuiIconVisAreaStacked;
