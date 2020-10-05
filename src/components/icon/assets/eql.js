import React from 'react';

const EuiIconEql = ({ title, titleId, ...props }) => (
  <svg
    width={26}
    height={24}
    viewBox="0 0 26 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 1.5a8.5 8.5 0 104.425 15.759l.336-.205 5.446 5.446h3.086l-6.891-6.89.275-.35A8.5 8.5 0 0010 1.5zM.5 10a9.5 9.5 0 1117.23 5.523l7.977 7.977h-5.914l-5.189-5.189A9.5 9.5 0 01.5 10z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 10a6 6 0 11-12 0 6 6 0 0112 0zm-6 5a5 5 0 100-10 5 5 0 000 10z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.5 9.066v1.868l1.5.9 1.5-.9V9.066l-1.5-.9-1.5.9zM10 7L7.5 8.5v3L10 13l2.5-1.5v-3L10 7z"
    />
  </svg>
);

export const icon = EuiIconEql;
