import * as React from 'react';

const EuiIconTokenCompletionSuggester = ({ title, titleId, ...props }) => (
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
      d="M3 4a1 1 0 011-1h8a1 1 0 011 1v5.996a1 1 0 01-1 1h-1.661L7.4 13.2A.25.25 0 017 13v-2.004H4a1 1 0 01-1-1V4zm1.5 1a.5.5 0 01.5-.5h6a.5.5 0 01.5.5v4a.5.5 0 01-.5.5h-.9L8 11V9.5H5a.5.5 0 01-.5-.5V5z"
      clipRule="evenodd"
    />
    <path d="M6.75 6a1 1 0 100 2 1 1 0 000-2zm2.5 0a1 1 0 100 2 1 1 0 000-2z" />
  </svg>
);

export const icon = EuiIconTokenCompletionSuggester;
