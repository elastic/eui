import React from 'react';

const EuiIconTokenOperator = ({ title, titleId, ...props }) => (
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
      d="M2.667 8.002c0-1.5.394-2.743 1.248-3.822h1.437c-.652.8-1.14 2.388-1.14 3.822 0 1.43.488 3.018 1.14 3.818H3.915c-.854-1.08-1.248-2.322-1.248-3.818zM6.77 9.998l-.818-.803 1.23-1.197-1.23-1.203.83-.793 1.221 1.193L9.23 6.002l.818.793-1.227 1.2 1.227 1.2-.818.803L8 8.795 6.77 9.998zm6.563-2c0 1.5-.394 2.743-1.248 3.822h-1.437c.652-.8 1.14-2.388 1.14-3.822 0-1.43-.488-3.018-1.14-3.818h1.437c.854 1.08 1.248 2.322 1.248 3.818z"
    />
  </svg>
);

export const icon = EuiIconTokenOperator;
