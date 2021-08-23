import * as React from 'react';

const EuiIconTokenAlias = ({ title, titleId, ...props }) => (
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
      d="M9.075 6.953a.5.5 0 11-.707.707 1.5 1.5 0 00-2.122 0L4.125 9.782a1.5 1.5 0 102.121 2.121l1.145-1.144a.5.5 0 01.707.707L6.953 12.61a2.5 2.5 0 11-3.535-3.535l2.121-2.122a2.5 2.5 0 013.536 0zm3.535-3.535a2.5 2.5 0 010 3.535L10.49 9.075a2.5 2.5 0 01-3.536 0 .5.5 0 11.707-.708 1.5 1.5 0 002.122 0l2.121-2.12a1.5 1.5 0 10-2.121-2.122L8.637 5.269a.5.5 0 11-.707-.707l1.145-1.144a2.5 2.5 0 013.535 0z"
    />
  </svg>
);

export const icon = EuiIconTokenAlias;
