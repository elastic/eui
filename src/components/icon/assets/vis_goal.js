import React from 'react';

const EuiIconVisGoal = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10.725 3.653a6 6 0 012.847 7.576.5.5 0 01-.928-.372 5 5 0 10-9.293-.014.5.5 0 01-.218.619L1.39 12.47a.5.5 0 01-.708-.23A7.99 7.99 0 010 9a8 8 0 0111.212-7.329.5.5 0 01.234.704l-.721 1.278zm-.933-.38l.5-.889a7 7 0 00-8.902 8.93l.886-.511a6 6 0 017.516-7.53zM6.73 9.467a1.75 1.75 0 112.539 0 2 2 0 11-2.539 0zM8 12.013a1 1 0 100-2 1 1 0 000 2zm0-3a.75.75 0 100-1.5.75.75 0 000 1.5z" />
  </svg>
);

export const icon = EuiIconVisGoal;
