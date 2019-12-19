import React from 'react';

const EuiIconAggregate = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.915 3a1.5 1.5 0 100 1H6.35a.5.5 0 01.457.297L8.231 7.5H3.915a1.5 1.5 0 100 1H8.23l-1.424 3.203A.5.5 0 016.35 12H3.915a1.5 1.5 0 100 1H6.35a1.5 1.5 0 001.37-.89L9.326 8.5H12.5a.5.5 0 000-1H9.325L7.72 3.89A1.5 1.5 0 006.35 3H3.914zM2 3.5a.5.5 0 111 0 .5.5 0 01-1 0zm1 9a.5.5 0 10-1 0 .5.5 0 001 0zm-.5-5a.5.5 0 110 1 .5.5 0 010-1z"
    />
    <path d="M12.056 5.146a.5.5 0 01.708 0l1.792 1.793a1.5 1.5 0 010 2.122l-1.792 1.793a.5.5 0 01-.708-.708l1.793-1.792a.5.5 0 000-.708l-1.793-1.792a.5.5 0 010-.708z" />
  </svg>
);

export const icon = EuiIconAggregate;
