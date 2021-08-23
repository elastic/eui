import * as React from 'react';

const EuiIconTokenPackage = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M8.049 3.785l3.852 1.006-4.049 1.103L4 4.791l3.951-1.006a.19.19 0 01.098 0zm.073 2.654l4.545-1.306v5.45l-.131.184-4.414 1.455V6.439zm-4.789 4.145V5.188L7.498 6.41v5.81l-4.034-1.453-.13-.183z"
    />
  </svg>
);

export const icon = EuiIconTokenPackage;
