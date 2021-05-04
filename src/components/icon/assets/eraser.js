import * as React from 'react';

const EuiIconEraser = ({ title, titleId, ...props }) => (
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
      d="M14.5 5.086a2 2 0 010 2.828L9.414 13H11.5a.5.5 0 110 1H3.414A2 2 0 012 13.414l-.5-.5a2 2 0 010-2.828L9.086 2.5a2 2 0 012.828 0L14.5 5.086zm-6.207 7.621a1 1 0 01-.707.293H3.414a1 1 0 01-.707-.293l-.5-.5a1 1 0 010-1.414l3.44-3.44 4 4-1.354 1.354zM7 6l1-1h5l.793.793a.996.996 0 01.159.207H7zm5-2l-.793-.793a1 1 0 00-1.414 0L9 4h3zM6.707 7h7.245a.996.996 0 01-.16.207L13 8H7.707l-1-1zM12 9H8.707l1.646 1.646L12 9z"
    />
    <path d="M13.5 13a.5.5 0 100 1h1a.5.5 0 100-1h-1zm-1-1a.5.5 0 100-1 .5.5 0 000 1zm2.5-1.5a.5.5 0 11-1 0 .5.5 0 011 0z" />
  </svg>
);

export const icon = EuiIconEraser;
