import React from 'react';

const EuiIconExit = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path
      fillRule="evenodd"
      d="M12.535 12.493a.47.47 0 01.468.468v2.564a.473.473 0 01-.466.475H3V0H12.595a.45.45 0 01.398.463v2.565a.469.469 0 01-.468.467h-.065a.468.468 0 01-.467-.467V1H4v14h8.01l-.007-2.04c0-.257.21-.467.467-.467h.065zm-1.096-7.59l2.121 2.122a1.5 1.5 0 010 2.121l-2.12 2.122a.5.5 0 11-.708-.708l2.121-2.12a.5.5 0 000-.708l-2.121-2.121a.5.5 0 01.707-.707z"
    />
  </svg>
);

export const icon = EuiIconExit;
