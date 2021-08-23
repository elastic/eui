import * as React from 'react';

const EuiIconKqlField = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={10}
    viewBox="0 0 16 10"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 9a5 5 0 110-8 5 5 0 110 8zm.75-.692a4 4 0 100-6.615A4.981 4.981 0 0110 5a4.981 4.981 0 01-1.25 3.308zM4.133 8V5.559h2.496v-.625H4.133V2.996h2.719v-.633H3.43V8h.703z" />
  </svg>
);

export const icon = EuiIconKqlField;
