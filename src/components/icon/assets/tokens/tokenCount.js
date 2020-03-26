import React from 'react';

const EuiIconTokenBinary = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g>
      <path d="M9 4.25C9 4.11193 8.88807 4 8.75 4H3.25C3.11193 4 3 4.11193 3 4.25V7C3 7.13807 3.11193 7.25 3.25 7.25H8.75C8.88807 7.25 9 7.13807 9 7V4.25Z" />
      <path d="M13 4.25C13 4.11193 12.8881 4 12.75 4H10.25C10.1119 4 10 4.11193 10 4.25V7C10 7.13807 10.1119 7.25 10.25 7.25H12.75C12.8881 7.25 13 7.13807 13 7V4.25Z" />
      <path d="M3 9C3 8.86193 3.11193 8.75 3.25 8.75H4.75C4.88807 8.75 5 8.86193 5 9V11.75C5 11.8881 4.88807 12 4.75 12H3.25C3.11193 12 3 11.8881 3 11.75V9Z" />
      <path d="M13 9C13 8.86193 12.8881 8.75 12.75 8.75H6.25C6.11193 8.75 6 8.86193 6 9V11.75C6 11.8881 6.11193 12 6.25 12H12.75C12.8881 12 13 11.8881 13 11.75V9Z" />
    </g>
  </svg>
);

export const icon = EuiIconTokenBinary;
