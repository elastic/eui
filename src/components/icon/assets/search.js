import React from 'react';

const EuiIconSearch = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M11.271 11.978l3.872 3.873a.502.502 0 00.708 0 .502.502 0 000-.708l-3.565-3.564c2.38-2.747 2.267-6.923-.342-9.532-2.73-2.73-7.17-2.73-9.898 0-2.728 2.729-2.728 7.17 0 9.9a6.955 6.955 0 004.949 2.05.5.5 0 000-1 5.96 5.96 0 01-4.242-1.757 6.01 6.01 0 010-8.486c2.337-2.34 6.143-2.34 8.484 0a6.01 6.01 0 010 8.486.5.5 0 00.034.738z" />
  </svg>
);

export const icon = EuiIconSearch;
