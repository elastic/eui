import React from 'react';

const EuiIconTokenKey = ({ title, titleId, ...props }) => (
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
      d="M12.667 6.542A3.208 3.208 0 018.86 9.694l-.438.492a.437.437 0 01-.327.147h-.678v.73a.437.437 0 01-.438.437H6.25v.73a.437.437 0 01-.438.437H3.772a.437.437 0 01-.438-.438v-1.423c0-.116.046-.227.128-.31l2.95-2.949a3.208 3.208 0 013.047-4.214 3.202 3.202 0 013.209 3.209zm-3.209-.875a.875.875 0 101.75 0 .875.875 0 00-1.75 0z"
    />
  </svg>
);

export const icon = EuiIconTokenKey;
