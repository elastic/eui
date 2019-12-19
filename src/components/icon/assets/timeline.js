import React from 'react';

const EuiIconTimeline = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 5a.5.5 0 001 0v-.5H10a1 1 0 001-1V2a1 1 0 00-1-1H6a1 1 0 00-1 1v1.5a1 1 0 001 1h1.5V5zM10 2H6v1.5h4V2zM3 9.5a1.5 1.5 0 001.417-1.007.503.503 0 00.083.007h2a.503.503 0 00.083-.007 1.5 1.5 0 002.834 0A.503.503 0 009.5 8.5h2a.503.503 0 00.083-.007 1.5 1.5 0 002.834 0 .503.503 0 00.083.007h1a.5.5 0 000-1h-1a.503.503 0 00-.083.007 1.5 1.5 0 00-2.834 0A.503.503 0 0011.5 7.5h-2a.503.503 0 00-.083.007 1.5 1.5 0 00-2.834 0A.503.503 0 006.5 7.5h-2a.503.503 0 00-.083.007 1.5 1.5 0 00-2.834 0A.503.503 0 001.5 7.5h-1a.5.5 0 000 1h1a.503.503 0 00.083-.007A1.5 1.5 0 003 9.5zM2.5 8a.5.5 0 111 0 .5.5 0 01-1 0zm5 0a.5.5 0 111 0 .5.5 0 01-1 0zm5.5-.5a.5.5 0 100 1 .5.5 0 000-1zM3 10.5a.5.5 0 00-.5.5v.5H1a1 1 0 00-1 1V14a1 1 0 001 1h4a1 1 0 001-1v-1.5a1 1 0 00-1-1H3.5V11a.5.5 0 00-.5-.5zM5 14v-1.5H1V14h4zM12.5 11a.5.5 0 011 0v.5H15a1 1 0 011 1V14a1 1 0 01-1 1h-4a1 1 0 01-1-1v-1.5a1 1 0 011-1h1.5V11zm2.5 3h-4v-1.5h4V14z"
    />
  </svg>
);

export const icon = EuiIconTimeline;
